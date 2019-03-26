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
	sendVerificationCodeFailure,
	sendVerificationCodeSuccess,
	sendVerificationCodeFetching,
} from './actionsFetching';
import { Action, handleActions } from 'redux-actions';
import { IEnrollFetchingDataReducer } from './models';
import { IServerError } from './ServerModels';

const defaultState: IEnrollFetchingDataReducer = {
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

const enrollFetchingReducer = handleActions(
	{
		[checkPersonExistRequest.toString()]: (state: IEnrollFetchingDataReducer) => {
			return {
				...state,
				checkExistPersonFetching: true,
				npId: 0,
			};
		},
		[checkPersonExistSuccess.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, (npId: string) => {
				return { ...state, checkExistPersonFetching: false, npId };
			}),
		[checkPersonExistFailure.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, checkExistPersonFetching: false, checkExistPersonError: data };
			}),

		[checkPersonLoginRequest.toString()]: (state: IEnrollFetchingDataReducer) => {
			return {
				...state,
				checkPersonLoginFetching: true,
				checkPersonLoginError: null,
			};
		},
		[checkPersonLoginSuccess.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, () => {
				return { ...state, checkPersonLoginFetching: false };
			}),
		[checkPersonLoginFailure.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, checkPersonLoginFetching: false, checkPersonLoginError: data };
			}),

		[registerNewPersonFetching.toString()]: (state: IEnrollFetchingDataReducer) => {
			return {
				...state,
				registerNewPersonFetching: true,
			};
		},
		[registerNewPersonSuccess.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, (npId: number) => {
				return { ...state, registerNewPersonFetching: false, npId };
			}),
		[registerNewPersonFailure.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, registerNewPersonFetching: false, registerNewPersonError: data };
			}),

		[sendVerificationCodeFetching.toString()]: (state: IEnrollFetchingDataReducer) => {
			return {
				...state,
				verifyPersonFetching: true,
				verifyPersonError: null,
			};
		},
		[sendVerificationCodeSuccess.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, () => {
				return { ...state, verifyPersonFetching: false, confirmationCodeAvailable: true };
			}),
		[sendVerificationCodeFailure.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, verifyPersonFetching: false, verifyPersonError: data };
			}),

		[confirmRegisterCodeFetching.toString()]: (state: IEnrollFetchingDataReducer) => {
			return {
				...state,
				confirmRegisterCodeFetching: true,
				confirmRegisterCodeError: null,
			};
		},
		[confirmRegisterCodeSuccess.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, () => {
				return { ...state, confirmRegisterCodeFetching: false, personVerified: true };
			}),
		[confirmRegisterCodeFailure.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, confirmRegisterCodeFetching: false, confirmRegisterCodeError: data };
			}),
	},

	defaultState,
);

export default { enrollFetching: enrollFetchingReducer };
