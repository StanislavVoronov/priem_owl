import { createVerificationCodeActions } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { EnrollRestApi, PriemEnroll } from '$services';

export interface ICreateVerificationCodeRequest {
	email: string;
	not_use_phone: number;
	mobile_phone: string;
}

export interface ICreateVerificationCodeResponse {
	id: number;
	count: number;
}

export const createVerificationCodeTransaction = (
	email: string,
	mobilePhone: string,
	notUsePhone: number,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	dispatch(createVerificationCodeActions.request());

	return PriemEnroll.post<ICreateVerificationCodeRequest, ICreateVerificationCodeResponse>(EnrollRestApi.VerNewNp, {
		email,
		mobile_phone: mobilePhone,
		not_use_phone: notUsePhone,
	})
		.then(response => {
			console.log('response', response);
			dispatch(createVerificationCodeActions.success([response]));
		})
		.catch(error => {
			dispatch(createVerificationCodeActions.failure(error));
		});
};
