import { IServerError, fetchPriemInstitutesActions, ISelectItem } from '$common';
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
}
export const fetchPriemInstitutesTransaction = (
	filialId: number,
): ThunkAction<Promise<ISelectItem[]>, IRootState, void, Action> => dispatch => {
	dispatch(fetchPriemInstitutesActions.request());

	const payload = {
		FILIAL: filialId,
	};

	return PriemApi.selectData<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemInstitutes, payload)
		.then(response => {
			const list = response.map(item => ({ id: item.ID, name: item.NAME }));
			dispatch(fetchPriemInstitutesActions.success(list));

			return Promise.resolve(list);
		})
		.catch((error: IServerError) => {
			// dispatch(fetchPriemInstitutesActions.failure(error));

			return Promise.reject(error);
		});
};
