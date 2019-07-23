import {
	IServerError,
	ISelectItem,
	fetchPriemProfilesActions,
	fetchPriemEducationLevelsActions,
	fetchPriemPayFormsActions,
	fetchPriemGroups,
	IPriemGroup,
} from '$common';
import { ThunkAction } from 'redux-thunk';
import { fromTransaction, IRootState } from '$store';
import { Action } from 'redux';
import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	ID: number;
	NEED_DOC: number;
}

interface IFetchRequest {
	FILIAL: number;
	INST: number;
	DIR: number;
	FIN: number;
	FOE: number;
}

interface IPayload {
	filialId: number;
	instituteId: number;
	educationFormId: number;
	directionId: number;
	finFormId: number;
}

export const fetchPriemGroupsTransaction = (
	data: IPayload,
): ThunkAction<Promise<IPriemGroup>, IRootState, void, Action> => (dispatch, getState) => {
	dispatch(fetchPriemGroups.request());

	const payload = {
		FILIAL: data.filialId,
		INST: data.instituteId,
		FOE: data.educationFormId,
		DIR: data.directionId,
		FIN: data.finFormId,
	};

	return PriemApi.selectData<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemFinForms, payload)
		.then(response => {
			const list = response.map(item => ({ admId: item.ID, needDoc: item.NEED_DOC > 0 }));
			dispatch(fetchPriemGroups.success(list));

			return Promise.resolve(list[0]);
		})
		.catch((error: IServerError) => {
			dispatch(fetchPriemGroups.failure(error));

			return Promise.reject(error);
		});
};
