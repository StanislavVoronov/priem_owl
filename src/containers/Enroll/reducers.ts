import { checkPayload } from '../../common';

import {
	checkPersonExistRequest,
	checkPersonSuccess,
	checkPersonFailure,
	checkLoginFailure,
	checkLoginRequest,
	checkLoginSuccess,
	registerNewPersonSuccess,
	registerNewPersonFailure,
	registerPersonFetching,
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
import { IEnrollState } from './models';
import { INewPersonDataResponse, IServerError } from './serverModels';

const defaultState: IEnrollState = {
	checkPersonFetching: false,
	npId: 0,
	confirmationCodeAvailable: false,
	checkPersonError: null,
	checkLoginFetching: false,
	checkLoginError: null,
	registerPersonFetching: false,
	registerPersonError: null,
	verifyPersonFetching: false,
	verifyPersonError: null,
	createPersonFetching: false,
	createPersonError: null,
	uploadDocsError: null,
	uploadDocsFetching: false,
};

const enrollReducer = handleActions(
	{
		[checkPersonExistRequest.toString()]: (state: IEnrollState) => {
			return {
				...state,
				checkPersonFetching: true,
			};
		},
		[checkPersonSuccess.toString()]: (state: IEnrollState, action: Action<any>) =>
			checkPayload(action, () => {
				return { ...state, checkPersonFetching: false };
			}),
		[checkPersonFailure.toString()]: (state: IEnrollState, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, checkPersonFetching: false, checkPersonError: data };
			}),

		[checkLoginRequest.toString()]: (state: IEnrollState) => {
			return {
				...state,
				checkLoginFetching: true,
				checkLoginError: null,
			};
		},
		[checkLoginSuccess.toString()]: (state: IEnrollState, action: Action<any>) =>
			checkPayload(action, () => {
				return { ...state, checkLoginFetching: false };
			}),
		[checkLoginFailure.toString()]: (state: IEnrollState, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, checkLoginFetching: false, checkLoginError: data };
			}),

		[registerPersonFetching.toString()]: (state: IEnrollState) => {
			return {
				...state,
				registerPersonFetching: true,
			};
		},
		[registerNewPersonSuccess.toString()]: (state: IEnrollState, action: Action<any>) =>
			checkPayload(action, (npId: number) => {
				console.log('registerNewPersonSuccess', npId);
				return { ...state, registerPersonFetching: false, npId };
			}),
		[registerNewPersonFailure.toString()]: (state: IEnrollState, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, registerPersonFetching: false, registerNewPersonError: data };
			}),

		[sendVerificationCodeFetching.toString()]: (state: IEnrollState) => {
			return {
				...state,
				verifyPersonFetching: true,
				verifyPersonError: null,
			};
		},
		[sendVerificationCodeSuccess.toString()]: (state: IEnrollState, action: Action<any>) =>
			checkPayload(action, () => {
				return { ...state, verifyPersonFetching: false, confirmationCodeAvailable: true };
			}),
		[sendVerificationCodeFailure.toString()]: (state: IEnrollState, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, verifyPersonFetching: false, verifyPersonError: data };
			}),

		[createPersonFetching.toString()]: (state: IEnrollState) => {
			return {
				...state,
				createPersonFetching: true,
				createPersonError: null,
			};
		},
		[createPersonSuccess.toString()]: (state: IEnrollState, action: Action<any>) =>
			checkPayload(action, (data: INewPersonDataResponse) => {
				return { ...state, createPersonFetching: false, personVerified: true, npId: data.np_uid };
			}),
		[createPersonFailure.toString()]: (state: IEnrollState, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, createPersonFetching: false, createPersonError: data };
			}),
		[uploadDocsFetching.toString()]: (state: IEnrollState, action: Action<any>) => ({
			...state,
			uploadDocsFetching: true,
		}),
		[uploadDocsSuccess.toString()]: (state: IEnrollState, action: Action<any>) => ({
			...state,
			uploadDocsFetching: false,
		}),
		[uploadDocsFailure.toString()]: (state: IEnrollState, action: Action<any>) =>
			checkPayload(action, (data: IServerError) => {
				return { ...state, uploadDocsFetching: false, uploadDocsError: data };
			}),
	},

	defaultState,
);

export default { enroll: enrollReducer };
