import { IPerson, PersonInfo } from './models';

import { IRootState } from '../../common';
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
	sendVerificationCodeFetching,
	sendVerificationCodeSuccess,
	sendVerificationCodeFailure,
	confirmRegisterCodeFetching,
	confirmRegisterCodeFailure,
	confirmRegisterCodeSuccess,
} from './actionsFetching';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
	ICheckPersonExistRequest,
	ICheckPersonExistResponse,
	ICheckPersonLoginRequest,
	ICheckPersonLoginResponse,
	IConfirmRegisterCodeRequest,
	IRegisterNewPersonRequest,
	IRegisterNewPersonResponse,
	IVerifyPersonRequest,
	IVerifyPersonResponse,
} from './ServerModels';
import { EnrollApiName, PriemApiName } from './apiNames';
import PriemEnroll from '../../modules/PriemEnroll';
import moment from 'moment';

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

export const sendVerificationCode = (
	email: string,
	phoneNumber: string,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	const payload = { email, not_use_phone: 1, mobile_phone: phoneNumber };

	dispatch(sendVerificationCodeFetching());

	return PriemEnroll.post<IVerifyPersonRequest, IVerifyPersonResponse>(EnrollApiName.VerNewNp, payload)
		.then(response => {
			console.log(response);
			dispatch(sendVerificationCodeSuccess());
		})
		.catch(error => {
			console.log('error', error);
			dispatch(sendVerificationCodeFailure(error));
		});
};

export const createPerson = (
	confirmCode: string,
	data: IPerson,
): ThunkAction<void, IRootState, void, Action> => dispatch => {
	if (data.contactsData && data.registerData && data.personData && data.educationData) {
		dispatch(confirmRegisterCodeFetching());
		const payload = {
			email_code: confirmCode,
			phone_code: '000000',
			email: data.contactsData.email,
			lname: data.registerData.lastName,
			fname: data.registerData.firstName,
			mname: data.registerData.middleName,
			birthdate: moment(data.registerData.birthday).format('DD-MM-YYYY'),
			birthplace: data.personData.birthPlace,
			need_hostel: data.contactsData.needDormitory ? 1 : 0,
			sex: parseInt(data.registerData.gender),
			hight_first: data.educationData.firstHighEducation ? 1 : 0,
			best_prev_edu: data.educationData.prevEducation,
			cheat_type: 0,
		};

		PriemEnroll.post<any, any>(EnrollApiName.SetNewNp, payload)
			.then((response: any) => {
				//{"np_uid":39257}
				console.log(response);
				dispatch(confirmRegisterCodeSuccess());
				return Promise.resolve();
			})
			.catch((error: any) => {
				console.log('error', error);
				dispatch(confirmRegisterCodeFailure(error));
				return Promise.reject();
			});
	}
};
