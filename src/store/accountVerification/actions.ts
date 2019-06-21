import { createAction } from 'redux-actions';
import { IAccountVerificationForm, VerificationMethod } from '$common';

const NAMESPACE = 'EnrollVerificationForm';

export const submitEnrollVerificationForm = createAction(
	`${NAMESPACE}/submitEnrollVerificationForm`,
	({ verificationCode }: IAccountVerificationForm) => verificationCode,
);

export const selectVerificationMethod = createAction(
	`${NAMESPACE}/selectVerificationMethod`,
	(method: VerificationMethod) => method,
);
