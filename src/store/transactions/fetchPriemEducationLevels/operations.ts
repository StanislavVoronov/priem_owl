import { IServerError, fetchPriemEducationLevelsActions, ISelectItem, fetchPriemDirectionsActions } from '$common';
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
}

interface IPayload {
	filialId: number;
	instituteId: number;
}
export const fetchPriemEducationLevelsTransaction = (
	data: IPayload,
): ThunkAction<Promise<ISelectItem[]>, IRootState, void, Action> => dispatch => {
	dispatch(fetchPriemEducationLevelsActions.request());

	const payload = {
		FILIAL: data.filialId,
		INST: data.instituteId,
	};

	return PriemApi.selectData<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemEducationLevels, payload)
		.then(response => {
			const list = response.map(item => ({ id: item.ID, name: item.NAME }));
			dispatch(fetchPriemEducationLevelsActions.success(list));

			return Promise.resolve(list);
		})
		.catch((error: IServerError) => {
			dispatch(fetchPriemEducationLevelsActions.failure(error));

			return Promise.reject(error);
		});
};
