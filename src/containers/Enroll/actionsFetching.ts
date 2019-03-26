import { createAction } from 'redux-actions';

import { IRegisterFormData } from './models';
import { IServerError } from './ServerModels';

export const checkPersonExistRequest = createAction('checkPersonExistRequest', () => {});
export const checkPersonExistSuccess = createAction('checkPersonExistSuccess', (npId: number) => npId);
export const checkPersonExistFailure = createAction('checkPersonExistFailure', (error: IServerError) => error);

export const checkPersonLoginRequest = createAction('checkPersonLoginRequest', () => void 0);
export const checkPersonLoginSuccess = createAction('checkPersonLoginSuccess', () => void 0);
export const checkPersonLoginFailure = createAction('checkPersonLoginFailure', (error: IServerError) => error);

export const registerNewPersonFetching = createAction('registerNewPersonFetching', () => void 0);
export const registerNewPersonSuccess = createAction('registerNewPersonSuccess', (npId: number) => npId);
export const registerNewPersonFailure = createAction('registerNewPersonFailure', (error: IServerError) => error);

export const confirmRegisterCodeFetching = createAction('confirmRegisterCodeFetching', () => void 0);
export const confirmRegisterCodeSuccess = createAction('confirmRegisterCodeSuccess', () => void 0);
export const confirmRegisterCodeFailure = createAction('confirmRegisterCodeFailure', (error: IServerError) => error);

export const sendVerificationCodeFetching = createAction('sendVerificationCodeFetching', () => void 0);
export const sendVerificationCodeSuccess = createAction('sendVerificationCodeSuccess', () => void 0);
export const sendVerificationCodeFailure = createAction('sendVerificationCodeFailure', (error: IServerError) => error);
export const enrollPersonData = createAction('enrollPersonData', (data: IRegisterFormData) => data);
