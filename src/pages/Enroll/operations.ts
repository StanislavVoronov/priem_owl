// import { IDocument, ServerBoolean, IServerError, IPerson, IEnrollRegisterStateForm } from '$common';
// import PriemApi from '../../services/PriemApi';
// import {
// 	checkPersonFailure,
// 	checkPersonRequest,
// 	checkPersonSuccess,
// 	checkLoginFailure,
// 	checkLoginRequest,
// 	checkLoginSuccess,
// 	createPersonFailure,
// 	createPersonFetching,
// 	createPersonSuccess,
// 	registerNewPersonFailure,
// 	registerPersonFetching,
// 	registerNewPersonSuccess,
// 	sendVerificationCodeFailure,
// 	sendVerificationCodeFetching,
// 	sendVerificationCodeSuccess,
// 	uploadDocsFetching,
// 	uploadDocsSuccess,
// 	uploadDocsFailure,
// } from './actions';
// import { Action } from 'redux';
// import { ThunkAction } from 'redux-thunk';
// import {
// 	ICheckPersonExistRequest,
// 	ICheckPersonExistResponse,
// 	ICheckLoginRequest,
// 	ICheckLoginResponse,
// 	INewPersonDataRequest,
// 	INewPersonDataResponse,
// 	IRegisterNewPersonRequest,
// 	IRegisterNewPersonResponse,
// 	IUploadDocRequest,
// 	ICreateVerificationCodeRequest,
// 	IVerifyPersonResponse,
// } from './serverModels';
// import { EnrollRestApi, PriemRestApi } from '../../services/restApiNames';
// import PriemEnroll from '../../services/PriemEnroll';
// import moment from 'moment';
// import { omitBy, isNull } from 'lodash';
// import { IRootState } from '$store';
// import { IEnrollForm } from './models';
//
// export const registerNewPerson = (
// 	form: IEnrollRegisterStateForm,
// ): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
// 	const { login, password, birthday, firstName, lastName, middleName, gender } = form.data;
//
// 	dispatch(registerPersonFetching());
//
// 	return dispatch(checkLogin(login)).then(() => {
// 		return PriemApi.post<IRegisterNewPersonRequest, IRegisterNewPersonResponse>(PriemRestApi.AddEnroll, {
// 			login,
// 			password,
// 		})
// 			.then(response => {
// 				dispatch(registerNewPersonSuccess(response.id));
//
// 				return dispatch(checkPerson({ firstName, middleName, lastName, birthday, gender }));
// 			})
// 			.catch(error => {
// 				dispatch(registerNewPersonFailure(error));
//
// 				return Promise.reject();
// 			});
// 	});
// };
// export const checkPerson = (data: IPerson): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
// 	const { firstName, birthday, lastName, middleName = '' } = data;
//
// 	const payload = {
// 		fname: firstName,
// 		lname: lastName,
// 		mname: middleName,
// 		birthdate: moment(birthday).format('YYYY-MM-DD'),
// 	};
//
// 	dispatch(checkPersonRequest());
//
// 	return PriemApi.checkData<ICheckPersonExistRequest, ICheckPersonExistResponse>(PriemRestApi.FindPerson, payload)
// 		.then(response => {
// 			if (response) {
// 				throw { message: 'Пользователь уже зарегистрирован в системе' };
// 			}
// 			dispatch(checkPersonSuccess());
//
// 			return Promise.resolve();
// 		})
// 		.catch((error: IServerError) => {
// 			dispatch(checkPersonFailure(error));
//
// 			return Promise.reject();
// 		});
// };
//
// export const sendVerificationCode = (
// 	Email: string,
// 	phoneNumber: string,
// ): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
// 	const payload = { Email, not_use_phone: 1, mobile_phone: phoneNumber };
//
// 	dispatch(sendVerificationCodeFetching());
//
// 	return PriemEnroll.post<ICreateVerificationCodeRequest, IVerifyPersonResponse>(EnrollRestApi.VerNewNp, payload)
// 		.then(response => {
// 			console.log(response);
// 			dispatch(sendVerificationCodeSuccess());
//
// 			return Promise.resolve();
// 		})
// 		.catch(error => {
// 			console.log('error', error);
// 			dispatch(sendVerificationCodeFailure(error));
//
// 			return Promise.reject();
// 		});
// };
//
// export const createPerson = (
// 	confirmCode: string,
// 	data: IEnrollForm,
// ): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
// 	dispatch(createPersonFetching());
//
// 	const passport = data.personData.document;
//
// 	const education = data.educationData.document;
//
// 	const registration = data.contactsData.document;
//
// 	const photo = data.personData.photo;
//
// 	const payload = {
// 		email_code: confirmCode,
// 		phone_code: '000000',
// 		Email: data.contactsData.Email,
// 		lname: data.regForm.data.lastName,
// 		fname: data.regForm.data.firstName,
// 		mname: data.regForm.data.middleName,
// 		birthdate: moment(data.regForm.data.birthday).format('DD-MM-YYYY'),
// 		birthplace: data.personData.birthPlace,
// 		need_hostel: data.contactsData.needDormitory ? ServerBoolean.True : ServerBoolean.False,
// 		sex: data.regForm.data.gender,
// 		hight_first: data.educationData.firstHighEducation ? ServerBoolean.True : ServerBoolean.False,
// 		best_prev_edu: data.educationData.prevEducation,
// 		cheat_type: 0,
// 	};
//
// 	return PriemEnroll.post<INewPersonDataRequest, INewPersonDataResponse>(EnrollRestApi.SetNewNp, payload)
// 		.then(response => {
// 			dispatch(createPersonSuccess(response.np_uid));
//
// 			return dispatch(uploadDocList([passport, photo, education, registration, ...(data.documents || [])]));
// 		})
// 		.catch((error: any) => {
// 			console.log('error', error);
// 			dispatch(createPersonFailure(error));
//
// 			return Promise.reject();
// 		});
// };
//
// const uploadDocList = (docList: IDocument[]): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
// 	dispatch(uploadDocsFetching());
//
// 	return Promise.all(
// 		docList.map((item: IDocument) => {
// 			const document: IUploadDocRequest = {
// 				mime: item.docFile ? item.docFile.type : null,
// 				type: item.docType ? item.docType.id : 0,
// 				stype: item.docSubType ? item.docSubType.id : null,
// 				seria: item.docSeries || '-',
// 				num: item.docNumber || '-',
// 				iss_org: item.docIssieBy ? `${item.docIssieBy}${item.codeDepartment ? ' ' + item.codeDepartment : ''}` : '-',
// 				iss_date: item.docDate ? moment(item.docDate).format('DD-MM-YYYY') : '01-01-1970',
// 				iss_gov: item.docGovernment ? item.docGovernment.id : 1,
// 			};
//
// 			return PriemApi.post(PriemRestApi.AddDocuments, omitBy(document, isNull), {
// 				page: { value: item.docFile, name: item.docFile ? item.docFile.name : '-' },
// 			})
// 				.then(response => {
// 					console.log('successDocuments', response);
//
// 					return Promise.resolve();
// 				})
// 				.catch(error => {
// 					console.log('errorDocuments', error);
//
// 					return Promise.reject();
// 				});
// 		}),
// 	)
// 		.then(() => {
// 			dispatch(uploadDocsSuccess());
//
// 			return Promise.resolve();
// 		})
// 		.catch((error: IServerError) => {
// 			dispatch(uploadDocsFailure(error));
//
// 			return Promise.reject();
// 		});
// };
