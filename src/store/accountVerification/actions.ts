import { createAction } from 'redux-actions';
import { ChangeEvent } from 'react';

const NAMESPACE = 'EnrollVerificationForm';

export const onChangeVerificationCode = createAction(
	`${NAMESPACE}/onChangeVerificationCode`,
	(event: ChangeEvent<HTMLInputElement>) => event,
);
