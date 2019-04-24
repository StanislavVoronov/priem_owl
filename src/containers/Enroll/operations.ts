import { IDocDataItem, IPerson, PersonInfo } from './models';

import { IRootState, ServerBoolean } from '../../common';
import PriemApi from '../../services/PriemApi';
import {
	checkPersonFailure,
	checkPersonExistRequest,
	checkPersonSuccess,
	checkLoginFailure,
	checkLoginRequest,
	checkLoginSuccess,
	createPersonFailure,
	createPersonFetching,
	createPersonSuccess,
	registerNewPersonFailure,
	registerPersonFetching,
	registerNewPersonSuccess,
	sendVerificationCodeFailure,
	sendVerificationCodeFetching,
	sendVerificationCodeSuccess,
	uploadDocsFetching,
} from './actions';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
	ICheckPersonExistRequest,
	ICheckPersonExistResponse,
	ICheckLoginRequest,
	ICheckLoginResponse,
	INewPersonDataRequest,
	INewPersonDataResponse,
	IRegisterNewPersonRequest,
	IRegisterNewPersonResponse,
	IUploadDocPayload,
	IVerifyPersonRequest,
	IVerifyPersonResponse,
} from './serverModels';
import { EnrollApiName, PriemApiName } from './apiNames';
import PriemEnroll from '../../services/PriemEnroll';
import moment from 'moment';
import { omitBy, isNull } from 'lodash';
export const registerNewPerson = (
	login: string,
	password: string,
): ThunkAction<Promise<number>, IRootState, void, Action> => dispatch => {
	const payload = { login, password };

	dispatch(registerPersonFetching());

	return PriemApi.post<IRegisterNewPersonRequest, IRegisterNewPersonResponse>(PriemApiName.AddEnroll, payload)
		.then(response => {
			dispatch(registerNewPersonSuccess(response.id));
			return response.id;
		})
		.catch(error => {
			dispatch(registerNewPersonFailure(error));
			return Promise.reject();
		});
};
export const checkPerson = (data: PersonInfo): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	const { firstName, birthday, lastName, middleName = '' } = data;

	const payload = {
		fname: firstName,
		lname: lastName,
		mname: middleName,
		birthdate: moment(birthday).format('YYYY-MM-DD'),
	};

	dispatch(checkPersonExistRequest());

	return PriemApi.checkData<ICheckPersonExistRequest, ICheckPersonExistResponse>(PriemApiName.FindNpId, payload)
		.then(data => {
			if (data) {
				dispatch(checkPersonFailure({ message: 'Пользователь уже зарегистрирован в системе' }));
				return Promise.reject();
			}
			dispatch(checkPersonSuccess());
			return Promise.resolve();
		})
		.catch(error => {
			dispatch(checkPersonFailure(error));
			return Promise.reject(error);
		});
};

export const checkLogin = (login: string): ThunkAction<void, IRootState, void, Action> => dispatch => {
	const payload = { login };
	if (login.length < 5) {
		return;
	}
	dispatch(checkLoginRequest());

	PriemApi.checkData<ICheckLoginRequest, ICheckLoginResponse>(PriemApiName.TestUniqueEnroll, payload)
		.then(data => {
			if (data.COUNT === 0) {
				dispatch(checkLoginSuccess());
			} else {
				dispatch(checkLoginFailure({ message: 'Логин уже занят' }));
			}
		})
		.catch(error => {
			dispatch(checkLoginFailure(error));
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
			return Promise.resolve();
		})
		.catch(error => {
			console.log('error', error);
			dispatch(sendVerificationCodeFailure(error));
			return Promise.reject();
		});
};

export const createPerson = (
	confirmCode: string,
	data: IPerson,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	if (data.contactsData && data.registerData && data.personData && data.educationData) {
		dispatch(createPersonFetching());

		const passport: IDocDataItem = {
			docNumber: data.personData.docNumber,
			docSeries: data.personData.docSeries,
			docDate: data.personData.docDate,
			docIssieBy: data.personData.docIssieBy,
			docFile: data.personData.docFile,
			docType: data.personData.docType,
			docSubType: data.personData.docSubType,
			docGovernment: data.personData.docGovernment,
		};

		const education: IDocDataItem = {
			docNumber: data.educationData.docNumber,
			docSeries: data.educationData.docSeries,
			docDate: data.educationData.docDate,
			docIssieBy: data.educationData.docIssieBy,
			docFile: data.educationData.docFile,
			docType: data.educationData.docType,
			docSubType: data.educationData.docSubType,
		};
		const registration: IDocDataItem = {
			docFile: data.contactsData.docFile,
			docType: data.contactsData.docType,
			docSubType: data.contactsData.docSubType,
		};

		const photo: IDocDataItem = {
			docFile: data.personData.photo.docFile,
			docType: data.personData.photo.docType,
		};
		const payload = {
			email_code: parseInt(confirmCode) || 0,
			phone_code: '000000',
			email: data.contactsData.email,
			lname: data.registerData.lastName,
			fname: data.registerData.firstName,
			mname: data.registerData.middleName,
			birthdate: moment(data.registerData.birthday).format('DD-MM-YYYY'),
			birthplace: data.personData.birthPlace,
			need_hostel: data.contactsData.needDormitory ? ServerBoolean.True : ServerBoolean.False,
			sex: data.registerData.gender,
			hight_first: data.educationData.firstHighEducation ? ServerBoolean.True : ServerBoolean.False,
			best_prev_edu: data.educationData.prevEducation,
			cheat_type: 0,
		};

		PriemEnroll.post<INewPersonDataRequest, INewPersonDataResponse>(EnrollApiName.SetNewNp, payload)
			.then(response => {
				dispatch(createPersonSuccess(response.np_uid));

				dispatch(uploadDocList([passport, photo, education, registration, ...(data.documents || [])]));
			})
			.catch((error: any) => {
				console.log('error', error);
				dispatch(createPersonFailure(error));
				return Promise.reject();
			});
	}
	return Promise.reject();
};

const uploadDocList = (docList: IDocDataItem[]): ThunkAction<void, IRootState, void, Action> => dispatch => {
	dispatch(uploadDocsFetching());
	console.log('documents', docList);
	docList.forEach((item: IDocDataItem) => {
		const document: IUploadDocPayload = {
			mime: item.docFile ? item.docFile.type : null,
			type: item.docType ? item.docType.id : 0,
			stype: item.docSubType ? item.docSubType.id : null,
			seria: item.docSeries || '-',
			num: item.docNumber || '-',
			iss_org: item.docIssieBy ? `${item.docIssieBy}${' ' + item.codeDepartment}` : '-',
			iss_date: item.docDate ? moment(item.docDate).format('DD-MM-YYYY') : '01-01-1970',
			iss_gov: item.docGovernment ? item.docGovernment.id : 1,
		};

		PriemApi.post(PriemApiName.AddDocuments, omitBy(document, isNull), {
			page: { value: item.docFile, name: item.docFile ? item.docFile.name : '-' },
		})
			.then(response => {
				console.log('successDocuments', response);
			})
			.catch(error => {
				console.log('errorDocuments', error);
			});
	});
};
