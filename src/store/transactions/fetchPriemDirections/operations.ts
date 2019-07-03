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
	LVL: number;
}

interface IPayload {
	filialId: number;
	instituteId: number;
	educationLevelId: number;
}
export const fetchPriemDirectionsTransaction = (
	data: IPayload,
): ThunkAction<Promise<ISelectItem[]>, IRootState, void, Action> => dispatch => {
	dispatch(fetchPriemDirectionsActions.request());

	const payload = {
		FILIAL: data.filialId,
		INST: data.instituteId,
		LVL: data.educationLevelId,
	};

	return PriemApi.selectData<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemDirections, payload)
		.then(response => {
			const list = response.map(item => ({ id: item.ID, name: item.NAME }));
			dispatch(fetchPriemDirectionsActions.success(list));

			return Promise.resolve(list);
		})
		.catch((error: IServerError) => {
			dispatch(fetchPriemDirectionsActions.failure(error));

			return Promise.reject(error);
		});
};
