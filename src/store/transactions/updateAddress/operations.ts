import { updateAddressActions, IEnrollContactsForm, IPerson, IServerError } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { PriemApi, PriemRestApi } from '$services';

export interface IContactRequest {
	address: string;
	type: number;
}

export interface IContactResponse {
	[key: string]: string;
}
export const updateAddressTransaction = (
	payload: IContactRequest,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	const { type } = payload;
	dispatch(updateAddressActions.request(type.toString()));

	return PriemApi.post<IContactRequest, any>(PriemRestApi.UpdateAddress, payload)
		.then(response => {
			dispatch(updateAddressActions.success(type.toString(), response));

			return Promise.resolve();
		})
		.catch((error: IServerError) => {
			dispatch(updateAddressActions.failure(type.toString(), error));

			return Promise.reject(error);
		});
};
