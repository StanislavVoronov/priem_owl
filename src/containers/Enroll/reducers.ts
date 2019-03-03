import { checkPayload, IServerError } from '../../common';

import {
	checkPersonExistRequest,
	checkPersonExistSuccess,
	checkPersonExistFailure,
	checkPersonLoginFailure,
	checkPersonLoginRequest,
	checkPersonLoginSuccess,
	registerNewPersonSuccess,
	registerNewPersonFailure,
	registerNewPersonFetching,
	enrollPersonData,
} from './actions';
import { Action, handleActions } from 'redux-actions';
import { IEnrollReducer, IRegisterFormData } from './models';
const defaultState: IEnrollReducer = {
	checkPersonExistsFetching: false,
	npId: '',
	email: '',
	checkPersonExistsError: null,
	checkPersonLoginFetching: false,
	personLoginExists: false,
	checkPersonLoginError: null,
	registerNewPersonFetching: false,
	registerNewPersonError: null,
	registerPersonData: null,
};

const enrollNewPersonReducer = handleActions(
	{
		[checkPersonExistRequest.toString()]: (state: IEnrollReducer) => {
			return {
				...state,
				checkExistPersonFetching: true,
				npId: '',
			};
		},
		[checkPersonExistSuccess.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (npId: string) => {
				return { ...state, checkExistPersonFetching: false, npId };
			}),
		[checkPersonExistFailure.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, checkExistPersonFetching: false, checkExistPersonError: data.error };
			}),
		[checkPersonLoginRequest.toString()]: (state: IEnrollReducer) => {
			return {
				...state,
				checkPersonLoginFetching: true,
				personLoginExists: false,
			};
		},
		[checkPersonLoginSuccess.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (personLoginExists: boolean) => {
				return { ...state, checkPersonLoginFetching: false, personLoginExists };
			}),
		[checkPersonLoginFailure.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, checkPersonLoginFetching: false, checkPersonLoginError: data.error };
			}),

		[registerNewPersonFetching.toString()]: (state: IEnrollReducer) => {
			return {
				...state,
				registerNewPersonFetching: true,
			};
		},
		[registerNewPersonSuccess.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (npId: string) => {
				return { ...state, registerNewPersonFetching: false };
			}),
		[registerNewPersonFailure.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, registerNewPersonFetching: false, registerNewPersonError: data.error };
			}),
		[enrollPersonData.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (data: IRegisterFormData) => {
				return { ...state, registerPersonData: data };
			}),
	},

	defaultState,
);

export const enrollReducer = {
	enroll: enrollNewPersonReducer,
};
