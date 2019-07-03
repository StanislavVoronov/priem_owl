import {
	IServerError,
	ISelectItem,
	fetchPriemProfilesActions,
	fetchPriemEducationLevelsActions,
	fetchPriemPayFormsActions,
	fetchPriemGroups,
} from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	ID: number;
	SHORTNAME: string;
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
): ThunkAction<Promise<ISelectItem[]>, IRootState, void, Action> => dispatch => {
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
			const list = response.map(item => ({ id: item.ID, name: item.SHORTNAME }));
			dispatch(fetchPriemGroups.success(list));

			return Promise.resolve(list);
		})
		.catch((error: IServerError) => {
			dispatch(fetchPriemGroups.failure(error));

			return Promise.reject(error);
		});
};
