import {
	IServerError,
	ISelectItem,
	fetchPriemProfilesActions,
	fetchPriemEducationLevelsActions,
	fetchPriemPayFormsActions,
} from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}

interface IFetchRequest {
	FILIAL: number;
	INST: number;
	DIR: number;
	PROFILE: number;
	FOE: number;
}

interface IPayload {
	filialId: number;
	instituteId: number;
	educationFormId: number;
	directionId: number;
	profileId: number;
}
export const fetchPriemPayFormsTransaction = (
	data: IPayload,
): ThunkAction<Promise<ISelectItem[]>, IRootState, void, Action> => dispatch => {
	dispatch(fetchPriemPayFormsActions.request());

	const payload = {
		FILIAL: data.filialId,
		INST: data.instituteId,
		FOE: data.educationFormId,
		DIR: data.directionId,
		PROFILE: data.profileId,
	};

	return PriemApi.selectData<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemPayForms, payload)
		.then(response => {
			const list = response.map(item => ({ id: item.ID, name: item.NAME }));
			dispatch(fetchPriemPayFormsActions.success(list));

			return Promise.resolve(list);
		})
		.catch((error: IServerError) => {
			dispatch(fetchPriemPayFormsActions.failure(error));

			return Promise.reject(error);
		});
};
