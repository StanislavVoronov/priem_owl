import { createLoginActions } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { PriemApi, PriemRestApi } from '$services';

interface ICreateLoginRequest {
	login: string;
	password: string;
}

export interface ICreateLoginResponse {
	id: number;
	count: number;
}

export const createLoginTransaction = (
	login: string,
	password: string,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	dispatch(createLoginActions.request());

	return PriemApi.post<ICreateLoginRequest, ICreateLoginResponse>(PriemRestApi.AddEnroll, {
		login,
		password,
	})
		.then(response => {
			console.log('response', response);
			dispatch(createLoginActions.success([response]));
		})
		.catch(error => {
			dispatch(createLoginActions.failure(error));
		});
};
