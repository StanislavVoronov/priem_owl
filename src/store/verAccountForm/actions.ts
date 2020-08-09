import { createAction } from '@black_bird/utils';
import { IClassifier, IVerAccountForm, VerificationMethod } from '$common';
import { IFormField } from '@black_bird/components';

const NAMESPACE = 'VerAccountForm';

export const submitVerAccountForm = createAction<IVerAccountForm>(`${NAMESPACE}/SUBMIT`);

export const verAccountMethodChanged = createAction<IFormField<IClassifier<VerificationMethod>>>(
	`${NAMESPACE}/VER_ACCOUNT_METHOD_CHANGED`,
);
