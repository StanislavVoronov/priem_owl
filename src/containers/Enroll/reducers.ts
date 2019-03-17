import { checkPayload } from '../../common';

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
	confirmRegisterCodeFetching,
	confirmRegisterCodeFailure,
	confirmRegisterCodeSuccess,
	verifyPersonFailure,
	verifyPersonSuccess,
	verifyPersonFetching,
} from './actions';
import { Action, handleActions } from 'redux-actions';
import { IEnrollReducer } from './models';
import { IServerError } from './ServerModels';

const defaultState: IEnrollReducer = {
	checkPersonExistsFetching: false,
	npId: 0,
	email: '',
	confirmationCodeAvailable: false,
	checkPersonExistsError: null,
	checkPersonLoginFetching: false,
	checkPersonLoginError: null,
	registerNewPersonFetching: false,
	registerNewPersonError: null,
	registerPersonData: null,
	verifyPersonFetching: false,
	verifyPersonError: null,
	confirmRegisterCodeFetching: false,
	confirmRegisterCodeError: null,
};

const enrollNewPersonReducer = handleActions(
	{
		[checkPersonExistRequest.toString()]: (state: IEnrollReducer) => {
			return {
				...state,
				checkExistPersonFetching: true,
				npId: 0,
			};
		},
		[checkPersonExistSuccess.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (npId: string) => {
				return { ...state, checkExistPersonFetching: false, npId };
			}),
		[checkPersonExistFailure.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, checkExistPersonFetching: false, checkExistPersonError: data };
			}),

		[checkPersonLoginRequest.toString()]: (state: IEnrollReducer) => {
			return {
				...state,
				checkPersonLoginFetching: true,
				checkPersonLoginError: null,
			};
		},
		[checkPersonLoginSuccess.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, () => {
				return { ...state, checkPersonLoginFetching: false };
			}),
		[checkPersonLoginFailure.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, checkPersonLoginFetching: false, checkPersonLoginError: data };
			}),

		[registerNewPersonFetching.toString()]: (state: IEnrollReducer) => {
			return {
				...state,
				registerNewPersonFetching: true,
			};
		},
		[registerNewPersonSuccess.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (npId: number) => {
				return { ...state, registerNewPersonFetching: false, npId };
			}),
		[registerNewPersonFailure.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, registerNewPersonFetching: false, registerNewPersonError: data };
			}),

		[verifyPersonFetching.toString()]: (state: IEnrollReducer) => {
			return {
				...state,
				verifyPersonFetching: true,
				verifyPersonError: null,
			};
		},
		[verifyPersonSuccess.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, () => {
				return { ...state, verifyPersonFetching: false, confirmationCodeAvailable: true };
			}),
		[verifyPersonFailure.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, verifyPersonFetching: false, verifyPersonError: data };
			}),

		[confirmRegisterCodeFetching.toString()]: (state: IEnrollReducer) => {
			return {
				...state,
				confirmRegisterCodeFetching: true,
				confirmRegisterCodeError: null,
			};
		},
		[confirmRegisterCodeSuccess.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, () => {
				return { ...state, confirmRegisterCodeFetching: false, personVerified: true };
			}),
		[confirmRegisterCodeFailure.toString()]: (state: IEnrollReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, confirmRegisterCodeFetching: false, confirmRegisterCodeError: data };
			}),
	},

	defaultState,
);

export const enrollReducer = {
	enroll: enrollNewPersonReducer,
};
