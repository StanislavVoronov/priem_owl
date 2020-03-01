import { VerificationMethod } from '$common';

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

export const createVerificationCodeRest = (email: string, mobilePhone: string, typeTransport?: VerificationMethod) => {
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
	);
};
