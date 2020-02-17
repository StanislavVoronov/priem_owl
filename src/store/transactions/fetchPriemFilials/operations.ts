import { IServerError, fetchPriemFilialsActions, ISelectItem } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}
export const fetchPriemFilialsTransaction = (): ThunkAction<
	Promise<ISelectItem[]>,
	IRootState,
	void,
	Action
> => dispatch => {
	dispatch(fetchPriemFilialsActions.request());

	return PriemApi.selectData<never, IFetchResponse>(PriemRestApi.FetchPriemFilials)
		.then(response => {
			const list = response.map(item => ({ id: item.ID, name: item.NAME }));
			dispatch(fetchPriemFilialsActions.success(list));

			return Promise.resolve(list);
		})
		.catch((error: IServerError) => {
			// dispatch(fetchPriemFilialsActions.failure(error));

			return Promise.reject(error);
		});
};
