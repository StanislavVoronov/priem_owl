import { IServerError, ISelectItem, fetchPriemProfilesActions } from '$common';
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
}

interface IPayload {
	filialId: number;
	instituteId: number;
	directionId: number;
}
export const fetchPriemProfilesTransaction = (
	data: IPayload,
): ThunkAction<Promise<ISelectItem[]>, IRootState, void, Action> => dispatch => {
	dispatch(fetchPriemProfilesActions.request());

	const payload = {
		FILIAL: data.filialId,
		INST: data.instituteId,
		DIR: data.directionId,
	};

	return PriemApi.selectData<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemProfiles, payload)
		.then(response => {
			const list = response.map(item => ({ id: item.ID, name: item.NAME }));
			dispatch(fetchPriemProfilesActions.success(list));

			return Promise.resolve(list);
		})
		.catch((error: IServerError) => {
			// dispatch(fetchPriemProfilesActions.failure(error));

			return Promise.reject(error);
		});
};
