import { createAction } from 'redux-actions';
import { ICheckPersonExistResponse } from './ServerModels';
import { IServerError, IServerResponseResult } from '../../common';
import { IRegisterFormData } from './models';

const REGISTER_NEW_PERSON = 'REGISTER_NEW_PERSON';

export const registerNewPerson = createAction('registerNewPerson', () => {});

export const checkPersonExistRequest = createAction('checkPersonExistRequest', () => {});
export const checkPersonExistSuccess = createAction('checkPersonExistSuccess', (npId: number) => npId);
export const checkPersonExistFailure = createAction('checkPersonExistFailure', (error: IServerError) => ({
	error,
}));

export const checkPersonLoginRequest = createAction('checkPersonLoginRequest', () => {});
export const checkPersonLoginSuccess = createAction(
	'checkPersonLoginSuccess',
	(personLoginExists: boolean) => personLoginExists,
);
export const checkPersonLoginFailure = createAction('checkPersonLoginFailure', (error: IServerError) => ({
	error,
}));

export const registerNewPersonFetching = createAction('registerNewPersonFetching', () => {});
export const registerNewPersonSuccess = createAction('registerNewPersonSuccess', (npId: number) => npId);
export const registerNewPersonFailure = createAction('registerNewPersonFailure', (error: IServerError) => ({
	error,
}));

export const enrollPersonData = createAction('enrollPersonData', (data: IRegisterFormData) => data);
