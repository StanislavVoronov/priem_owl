import { createAction } from 'redux-actions';
import { ChangeEvent } from 'react';
import { IDocument, ISelectItem } from '$common';

const NAMESPACE = 'EnrollVerificationForm';

export const onChangeVerificationCode = createAction(
	`${NAMESPACE}/onChangeVerificationCode`,
	(event: ChangeEvent<HTMLInputElement>) => event.target,
);
