import { createAction } from 'redux-actions';
import { IServerError } from '$common';

export const checkPersonRequest = createAction('checkPersonRequest', () => void 0);
export const checkPersonSuccess = createAction('checkPersonSuccess', () => void 0);
export const checkPersonFailure = createAction('checkPersonFailure', (error: IServerError) => error);

export const checkLoginRequest = createAction('checkLoginRequest', () => void 0);
export const checkLoginSuccess = createAction('checkLoginSuccess', () => void 0);
export const checkLoginFailure = createAction('checkLoginFailure', (error: IServerError) => error);

export const registerPersonFetching = createAction('registerPersonFetching', () => void 0);
export const registerNewPersonSuccess = createAction('registerNewPersonSuccess', (npId: number) => npId);
export const registerNewPersonFailure = createAction('registerNewPersonFailure', (error: IServerError) => error);

export const createPersonFetching = createAction('createPersonFetching', () => void 0);
export const createPersonSuccess = createAction('createPersonSuccess', (npId: number) => npId);
export const createPersonFailure = createAction('createPersonFailure', (error: IServerError) => error);

export const sendVerificationCodeFetching = createAction('sendVerificationCodeFetching', () => void 0);
export const sendVerificationCodeSuccess = createAction('sendVerificationCodeSuccess', () => void 0);
export const sendVerificationCodeFailure = createAction('sendVerificationCodeFailure', (error: IServerError) => error);

export const uploadDocsFetching = createAction('uploadDocsFetching', () => void 0);
export const uploadDocsSuccess = createAction('uploadDocsSuccess', () => void 0);
export const uploadDocsFailure = createAction('uploadDocsFailure', (error: IServerError) => error);
