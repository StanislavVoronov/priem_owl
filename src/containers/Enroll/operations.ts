import { IRegisterFormData, PersonInfo } from './models';

import { IRootState, IServerResponseResult } from '../../common';
import PriemApi from '../../modules/PriemApi';
import {
	checkPersonExistFailure,
	checkPersonExistRequest,
	checkPersonExistSuccess,
	checkPersonLoginRequest,
	checkPersonLoginSuccess,
	checkPersonLoginFailure,
	registerNewPersonFetching,
	registerNewPersonFailure,
	registerNewPersonSuccess,
	enrollPersonData,
	verifyPersonFetching,
	verifyPersonSuccess,
	verifyPersonFailure,
	confirmRegisterCodeFetching,
	confirmRegisterCodeFailure,
	confirmRegisterCodeSuccess,
} from './actions';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
	ICheckPersonExistRequest,
	ICheckPersonExistResponse,
	ICheckPersonLoginRequest,
	ICheckPersonLoginResponse,
	IConfirmRegisterCodeRequest,
	IPriemApiServerResponse,
	IRegisterNewPersonRequest,
	IRegisterNewPersonResponse,
	IVerifyPersonRequest,
	IVerifyPersonResponse,
} from './ServerModels';
import { EnrollApiName, PriemApiName } from './apiNames';
import PriemEnroll from '../../modules/PriemEnroll';
import { enrollStateSelector } from './selectors';

export const registerNewPerson = (
	login: string,
	password: string,
): ThunkAction<Promise<number>, IRootState, void, Action> => dispatch => {
	const payload = { login, password };

	dispatch(registerNewPersonFetching());

	return PriemApi.post<IRegisterNewPersonRequest, IRegisterNewPersonResponse>(PriemApiName.AddEnroll, payload)
		.then(response => {
			console.log(response);
			dispatch(registerNewPersonSuccess(response.id));
			return response.id;
		})
		.catch(error => {
			dispatch(registerNewPersonFailure(error));
			return Promise.reject();
		});
};
export const checkPersonExist = (data: PersonInfo): ThunkAction<void, IRootState, void, Action> => dispatch => {
	const { firstName, birthday, lastName, middleName = '' } = data;

	const payload = { fname: firstName, lname: lastName, mname: middleName, birthdate: birthday };

	dispatch(checkPersonExistRequest());

	PriemApi.checkData<ICheckPersonExistRequest, ICheckPersonExistResponse>(PriemApiName.FindNpId, payload)
		.then(data => {
			if (data) {
				dispatch(checkPersonExistSuccess(data.ID));
			} else {
				dispatch(checkPersonExistSuccess(0));
			}
		})
		.catch(error => dispatch(checkPersonExistFailure(error)));
};

export const checkPersonLogin = (login: string): ThunkAction<void, IRootState, void, Action> => dispatch => {
	const payload = { login };

	dispatch(checkPersonLoginRequest());

	PriemApi.checkData<ICheckPersonLoginRequest, ICheckPersonLoginResponse>(PriemApiName.TestUniqueEnroll, payload)
		.then(data => {
			if (data.COUNT === 0) {
				dispatch(checkPersonLoginSuccess());
			} else {
				dispatch(checkPersonLoginFailure({ message: 'Логин уже занят' }));
			}
		})
		.catch(error => {
			dispatch(checkPersonLoginFailure(error));
		});
};

export const verifyPerson = (email: string): ThunkAction<void, IRootState, void, Action> => dispatch => {
	const payload = { email, not_use_phone: 1, mobile_phone: '+79778202545' };

	dispatch(verifyPersonFetching());

	return PriemEnroll.post<IVerifyPersonRequest, IVerifyPersonResponse>(EnrollApiName.VerNewNp, payload)
		.then(response => {
			console.log(response);
			dispatch(verifyPersonSuccess());
		})
		.catch(error => {
			console.log('error', error);
			dispatch(verifyPersonFailure(error));
		});
};

export const confirmRegisterCode = (registerCode: string): ThunkAction<Promise<void>, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	dispatch(confirmRegisterCodeFetching());

	const state = getState();
	const npId = enrollStateSelector(state).npId;

	const payload = {
		np_uid: npId,
		code: registerCode,
	};
	console.log('payload', payload);
	return PriemEnroll.post<IConfirmRegisterCodeRequest, any>(EnrollApiName.SetNp, payload)
		.then(response => {
			dispatch(confirmRegisterCodeSuccess());
			return Promise.resolve();
		})
		.catch(error => {
			console.log('error', error);
			dispatch(confirmRegisterCodeFailure(error));
			return Promise.reject();
		});
};
