import { IDocument, ServerBoolean, IServerError, IPerson } from '$common';
import PriemApi from '../../services/PriemApi';
import {
	checkPersonFailure,
	checkPersonRequest,
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
import { EnrollRestApi, PriemRestApi } from '../../services/restApiNames';
import PriemEnroll from '../../services/PriemEnroll';
import moment from 'moment';
import { omitBy, isNull } from 'lodash';
import { IRootState } from '$store';
import { IEnrollForm } from './models';

export const registerNewPerson = (
	login: string,
	password: string,
): ThunkAction<Promise<number>, IRootState, void, Action> => dispatch => {
	const payload = { login, password };

	dispatch(registerPersonFetching());

	return PriemApi.post<IRegisterNewPersonRequest, IRegisterNewPersonResponse>(PriemRestApi.AddEnroll, payload)
		.then(response => {
			dispatch(registerNewPersonSuccess(response.id));

			return response.id;
		})
		.catch(error => {
			dispatch(registerNewPersonFailure(error));

			return Promise.reject();
		});
};
export const checkPerson = (data: IPerson): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	const { firstName, birthday, lastName, middleName = '' } = data;

	const payload = {
		fname: firstName,
		lname: lastName,
		mname: middleName,
		birthdate: moment(birthday).format('YYYY-MM-DD'),
	};

	dispatch(checkPersonRequest());

	return PriemApi.checkData<ICheckPersonExistRequest, ICheckPersonExistResponse>(PriemRestApi.FindNpId, payload)
		.then(response => {
			if (response) {
				throw { message: 'Пользователь уже зарегистрирован в системе' };
			}
			dispatch(checkPersonSuccess());

			return Promise.resolve();
		})
		.catch((error: IServerError) => {
			dispatch(checkPersonFailure(error));

			return Promise.reject();
		});
};

export const checkLogin = (login: string): ThunkAction<Promise<boolean>, IRootState, void, Action> => dispatch => {
	const payload = { login };

	dispatch(checkLoginRequest());

	return PriemApi.checkData<ICheckLoginRequest, ICheckLoginResponse>(PriemRestApi.TestUniqueEnroll, payload)
		.then(data => {
			if (data.COUNT === 0) {
				dispatch(checkLoginSuccess());

				return Promise.resolve(false);
			} else {
				const error = { message: 'Логин уже занят' };

				dispatch(checkLoginFailure(error));

				throw error;
			}
		})
		.catch((error: IServerError) => {
			dispatch(checkLoginFailure(error));

			return Promise.reject(error);
		});
};

export const sendVerificationCode = (
	email: string,
	phoneNumber: string,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	const payload = { email, not_use_phone: 1, mobile_phone: phoneNumber };

	dispatch(sendVerificationCodeFetching());

	return PriemEnroll.post<IVerifyPersonRequest, IVerifyPersonResponse>(EnrollRestApi.VerNewNp, payload)
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
	data: IEnrollForm,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	if (data.contactsData && data.registerData && data.personData && data.educationData) {
		dispatch(createPersonFetching());

		const passport = data.personData.document;

		const education = data.educationData.document;

		const registration = data.contactsData.document;

		const photo = data.personData.photo;

		const payload = {
			email_code: confirmCode,
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

		PriemEnroll.post<INewPersonDataRequest, INewPersonDataResponse>(EnrollRestApi.SetNewNp, payload)
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

const uploadDocList = (docList: IDocument[]): ThunkAction<void, IRootState, void, Action> => dispatch => {
	dispatch(uploadDocsFetching());
	console.log('documents', docList);
	docList.forEach((item: IDocument) => {
		console.log(item.docFile);
		const document: IUploadDocPayload = {
			mime: item.docFile ? item.docFile.type : null,
			type: item.docType ? item.docType.id : 0,
			stype: item.docSubType ? item.docSubType.id : null,
			seria: item.docSeries || '-',
			num: item.docNumber || '-',
			iss_org: item.docIssieBy ? `${item.docIssieBy}${item.codeDepartment ? ' ' + item.codeDepartment : ''}` : '-',
			iss_date: item.docDate ? moment(item.docDate).format('DD-MM-YYYY') : '01-01-1970',
			iss_gov: item.docGovernment ? item.docGovernment.id : 1,
		};

		PriemApi.post(PriemRestApi.AddDocuments, omitBy(document, isNull), {
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
