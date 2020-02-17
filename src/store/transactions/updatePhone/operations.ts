import { updatePhoneActionsByKey, IServerError } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState, ITransactionState } from '$store';
import { Action } from 'redux';
import { PriemApi, PriemRestApi } from '$services';

export interface IFindPersonRequest {
	phone: string;
	type: number;
}

export interface IFindPersonResponse {
	ID: number;
}

export const updatePhoneTransaction = (
	phone: IFindPersonRequest,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	dispatch(updatePhoneActionsByKey.request());

	return PriemApi.post<IFindPersonRequest, IFindPersonResponse>(PriemRestApi.UpdatePhone, phone)
		.then((response: any) => {
			dispatch(updatePhoneActionsByKey.success(response));

			return Promise.resolve();
		})
		.catch((error: IServerError) => {
			// dispatch(updatePhoneActionsByKey.failure(error));

			return Promise.reject(error);
		});
};

export const updatePhoneSelector = (state: ITransactionState) => {
	const { loading, error, result } = state.updatePhone;

	return { loading, error, result };
};
