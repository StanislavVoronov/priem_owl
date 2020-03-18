import { createAction } from 'redux-actions';

const NAMESPACE = 'VerAccountForm';

export const submitVerAccountForm = createAction(`${NAMESPACE}/SUBMIT`);

export const verAccountMethodChanged = createAction(`${NAMESPACE}/VER_ACCOUNT_METHOD_CHANGED`);
