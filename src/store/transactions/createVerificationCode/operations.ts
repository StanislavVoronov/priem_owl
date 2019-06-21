import { createVerificationCodeActions, VerificationMethod } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { EnrollRestApi, PriemEnroll } from '$services';

export interface ICreateVerificationCodeRequest {
	email: string;
	not_use_phone?: number;
	not_use_email?: number;
	mobile_phone: string;
}

export interface ICreateVerificationCodeResponse {
	id: number;
	count: number;
}

export const createVerificationCodeTransaction = (
	email: string,
	mobilePhone: string,
	typeTransport?: VerificationMethod,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	dispatch(createVerificationCodeActions.request());

	const payload: ICreateVerificationCodeRequest = {
		email,
		mobile_phone: mobilePhone.replace(/[- )(]/g, ''),
	};

	if (VerificationMethod.Email === typeTransport) {
		payload.not_use_phone = 1;
	} else {
		payload.not_use_email = 1;
	}

	return PriemEnroll.post<ICreateVerificationCodeRequest, ICreateVerificationCodeResponse>(
		EnrollRestApi.VerNewNp,
		payload,
	)
		.then(response => {
			dispatch(createVerificationCodeActions.success([response]));

			return Promise.resolve();
		})
		.catch(error => {
			dispatch(createVerificationCodeActions.failure(error));

			return Promise.reject();
		});
};
