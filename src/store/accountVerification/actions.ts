import { createAction } from 'redux-actions';
import { IAccountVerificationForm } from '$common';

const NAMESPACE = 'EnrollVerificationForm';

export const submitEnrollVerificationForm = createAction(
	`${NAMESPACE}/submitEnrollVerificationForm`,
	(form: IAccountVerificationForm) => form,
);
