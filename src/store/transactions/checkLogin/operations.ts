import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { checkLoginActions } from '$common';

import { PriemRestApi, PriemApi } from '$services';
import { IServerError } from '$common';
import { ReactText } from 'react';

interface ICheckLoginRequest {
	login: ReactText;
}

export interface ICheckLoginResponse {
	COUNT: number;
}

export const checkLoginTransaction = (
	login: string,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	const payload = { login };

	dispatch(checkLoginActions.request());

	return PriemApi.checkData<ICheckLoginRequest, ICheckLoginResponse>(PriemRestApi.CheckUniqueLogin, payload)
		.then(data => {
			dispatch(checkLoginActions.success(data));
		})
		.catch((error: IServerError) => {
			dispatch(checkLoginActions.failure(error));

			return Promise.reject(error);
		});
};
