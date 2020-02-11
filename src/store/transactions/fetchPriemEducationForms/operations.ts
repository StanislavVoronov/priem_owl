import {
	IServerError,
	ISelectItem,
	fetchPriemProfilesActions,
	fetchPriemEducationLevelsActions,
	fetchPriemEducationFormsActions,
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
}

interface IPayload {
	filialId: number;
	instituteId: number;
	directionId: number;
	profileId: number;
}
export const fetchPriemEducationFormsTransaction = (
	data: IPayload,
): ThunkAction<Promise<ISelectItem[]>, IRootState, void, Action> => dispatch => {
	dispatch(fetchPriemEducationFormsActions.request());

	const payload = {
		FILIAL: data.filialId,
		INST: data.instituteId,
		DIR: data.directionId,
		PROFILE: data.profileId,
	};

	return PriemApi.selectData<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemEducationForms, payload)
		.then(response => {
			const list = response.map(item => ({ id: item.ID, name: item.NAME }));
			dispatch(fetchPriemEducationFormsActions.success(list));

			return Promise.resolve(list);
		})
		.catch((error: IServerError) => {
			dispatch(fetchPriemEducationFormsActions.failure(error));

			return Promise.reject(error);
		});
};
