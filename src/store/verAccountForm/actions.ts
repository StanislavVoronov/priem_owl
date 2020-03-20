import { createAction } from '@black_bird/utils';
import { IVerAccountForm } from '$common';

const NAMESPACE = 'VerAccountForm';

export const submitVerAccountForm = createAction<IVerAccountForm>(`${NAMESPACE}/SUBMIT`);

export const verAccountMethodChanged = createAction(`${NAMESPACE}/VER_ACCOUNT_METHOD_CHANGED`);
