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
	createPersonFetching,
	createPersonFailure,
	createPersonSuccess,
	sendVerificationCodeFailure,
	sendVerificationCodeSuccess,
	sendVerificationCodeFetching,
	uploadDocsFetching,
	uploadDocsSuccess,
	uploadDocsFailure,
} from './actions';
import { Action, handleActions } from 'redux-actions';
import { IEnrollFetchingDataReducer } from './models';
import { INewPersonDataResponse, IServerError } from './serverModels';

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
	createPersonFetching: false,
	createPersonError: null,
	uploadDocsError: null,
	uploadDocsFetching: false,
};

const enrollReducer = handleActions(
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

		[createPersonFetching.toString()]: (state: IEnrollFetchingDataReducer) => {
			return {
				...state,
				createPersonFetching: true,
				createPersonError: null,
			};
		},
		[createPersonSuccess.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, (data: INewPersonDataResponse) => {
				return { ...state, createPersonFetching: false, personVerified: true, npId: data.np_uid };
			}),
		[createPersonFailure.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, createPersonFetching: false, createPersonError: data };
			}),
		[uploadDocsFetching.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) => ({
			...state,
			uploadDocsFetching: true,
		}),
		[uploadDocsSuccess.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) => ({
			...state,
			uploadDocsFetching: false,
		}),
		[uploadDocsFailure.toString()]: (state: IEnrollFetchingDataReducer, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, uploadDocsFetching: false, uploadDocsError: data };
			}),
	},

	defaultState,
);

export default { enroll: enrollReducer };
