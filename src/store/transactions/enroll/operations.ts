import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { enrollTransactionActions } from './reducers';

import { PriemRestApi, PriemApi } from '$services';
import { IServerError } from '$common';
import { ICheckLoginRequest, ICheckLoginResponse } from './models';

export const checkLoginTransaction = (login: string): ThunkAction<void, IRootState, void, Action> => dispatch => {
	const payload = { login };
	if (login.length > 4) {
		dispatch(enrollTransactionActions.request());

		PriemApi.checkData<ICheckLoginRequest, ICheckLoginResponse>(PriemRestApi.CheckUniqueLogin, payload)
			.then(data => {
				dispatch(enrollTransactionActions.success(data));
			})
			.catch((error: IServerError) => {
				dispatch(enrollTransactionActions.failure(error));

				return Promise.reject(error);
			});
	}
};
