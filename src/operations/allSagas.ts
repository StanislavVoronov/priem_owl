// import {
// 	createPersonTransaction,
// 	createVerificationCodeTransaction,
// 	enrollAccountVerificationFormSelector,
// 	applicationFormSelector,
// 	contactsFormSelector,
// 	enrollDocumentsFormSelector,
// 	educationFormSelector,
// 	personFormSelector,
// 	regFormSelector,
// 	fromTransaction,
// 	IRootState,
// 	selectVerificationMethod,
// 	uploadDocumentTransaction,
// 	changeCurrentInstitute,
// 	changeCurrentEducationLevel,
// 	changeCurrentDirection,
// 	changeCurrentPayForm,
// 	changeCurrentProfile,
// 	changeCurrentEducationForm,
// 	addPriemApplication as addPriemApplicationAction,
// 	deleteApplication,
// 	setPriemGroupNeedDocument,
// 	updatePriemGroups,
// } from '$store';
// import { ThunkAction } from 'redux-thunk';
// import { Action } from 'redux';
// import {
// 	moment,
// 	ServerBoolean,
// 	VerificationMethod,
// 	ISelectItem,
// 	fetchPriemProfilesActions,
// 	fetchPriemPayFormsActions,
// 	fetchPriemEducationFormsActions,
// } from '$common';
// import { updatePhoneTransaction } from '../store/transactions/updatePhone';
// import { updateAddressTransaction } from '../store/transactions/updateAddress';
//
// import { fetchPriemInstitutesTransaction } from '../store/transactions/priemInstitutes';
// import { fetchPriemEducationLevelsTransaction } from '../store/transactions/priemEducLevels';
// import { fetchPriemDirectionsTransaction } from '../store/transactions/priemDirections';
// import { fetchPriemProfilesTransaction } from '../store/transactions/fetchPriemProfiles';
// import { fetchPriemEducationFormsTransaction } from '../store/transactions/priemEducForms';
// import { fetchPriemPayFormsTransaction } from '../store/transactions/fetchPriemPayForms';
// import { fetchPriemGroupsTransaction } from '../store/transactions/fetchPriemGroups';
// import { createPriemApplicationTransaction } from '../store/transactions/createPriemApplication';
//
// export const sendVerificationCodeToPhone = (): ThunkAction<Promise<void>, IRootState, void, Action> => (
// 	dispatch,
// 	getState,
// ) => {
// 	const data = contactsFormSelector(getState());
//
// 	dispatch(selectVerificationMethod(VerificationMethod.Phone));
//
// 	return dispatch(createVerificationCodeTransaction(data.email, data.mobPhone, VerificationMethod.Phone));
// };
//
// export const sendVerificationCodeToEmail = (): ThunkAction<Promise<void>, IRootState, void, Action> => (
// 	dispatch,
// 	getState,
// ) => {
// 	const data = contactsFormSelector(getState());
//
// 	dispatch(selectVerificationMethod(VerificationMethod.Email));
//
// 	return dispatch(createVerificationCodeTransaction(data.email, data.mobPhone, VerificationMethod.Email));
// };
//
// export const updatePhone = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
// 	const data = contactsFormSelector(getState());
//
// 	return data.homePhone
// 		? dispatch(
// 				updatePhoneTransaction({
// 					phone: data.homePhone,
// 					type: 1,
// 				}),
// 		  )
// 		: Promise.resolve();
// };
//
// const createPerson = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
// 	const state = getState();
// 	const registrationForm = regFormSelector(state);
// 	const contactsForm = contactsFormSelector(state);
// 	const personForm = personFormSelector(state);
// 	const educationForm = educationFormSelector(state);
// 	const accountVerificationForm = enrollAccountVerificationFormSelector(state);
//
// 	const emailCode =
// 		accountVerificationForm.verificationMethod === VerificationMethod.Email
// 			? accountVerificationForm.verificationCode
// 			: '000000';
//
// 	const phoneCode =
// 		accountVerificationForm.verificationMethod === VerificationMethod.Phone
// 			? accountVerificationForm.verificationCode
// 			: '000000';
//
// 	const payload = {
// 		email_code: emailCode,
// 		phone_code: phoneCode,
// 		lname: registrationForm.lastName,
// 		fname: registrationForm.firstName,
// 		mname: registrationForm.middleName,
// 		birthdate: moment(registrationForm.birthday).format('DD-MM-YYYY'),
// 		birthplace: personForm.birthPlace,
// 		need_hostel: contactsForm.needDormitory ? ServerBoolean.True : ServerBoolean.False,
// 		sex: Number(registrationForm.gender),
// 		hight_first: educationForm.firstHighEducation ? ServerBoolean.True : ServerBoolean.False,
// 		best_prev_edu: educationForm.prevEducation ? educationForm.prevEducation.id : 0,
// 		cheat_type: 0,
// 	};
//
// 	return dispatch(createPersonTransaction(payload));
// };
// const uploadDocList = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
// 	const state = getState();
//
// 	const contactsData = contactsFormSelector(state);
// 	const personData = personFormSelector(state);
// 	const educationData = educationFormSelector(state);
// 	const documents = [contactsData, personData, educationData, ...enrollDocumentsFormSelector(state).documents];
//
// 	return Promise.all(
// 		documents.map(document => {
// 			// return dispatch(uploadDocumentTransaction(document));
// 		}),
// 	)
// 		.then(() => {
// 			return Promise.resolve();
// 		})
// 		.catch(error => {
// 			console.log('uploadDocList', error, document);
//
// 			return Promise.reject(error);
// 		});
// };
//
// const updateAddress = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
// 	const {
// 		regIndex,
// 		regRegion,
// 		regLocality,
// 		regStreet,
// 		regHome,
// 		regBlock,
// 		regFlat,
// 		liveBlock,
// 		liveFlat,
// 		liveHome,
// 		liveIndex,
// 		liveLocality,
// 		liveRegion,
// 		liveStreet,
// 	} = contactsFormSelector(getState());
//
// 	const regAddress = [regIndex, regRegion, regLocality, regStreet, regHome, regBlock, regFlat]
// 		.filter(value => value)
// 		.join(', ');
//
// 	const liveAddress = [liveIndex, liveRegion, liveLocality, liveStreet, liveHome, liveBlock, liveFlat]
// 		.filter(value => value)
// 		.join(', ');
//
// 	return Promise.all([
// 		dispatch(updateAddressTransaction({ address: regAddress, type: 1 })),
//
// 		dispatch(updateAddressTransaction({ address: liveAddress.length ? liveAddress : regAddress, type: 2 })),
// 	]).then(() => Promise.resolve());
// };
//
// export const priemFilials = (): ThunkAction<void, IRootState, void, Action> => dispatch => {
// 	dispatch(fetchPriemFilialsTransaction()).then(response => {
// 		dispatch(onChangeFilial(response[0]));
// 	});
// };
//
// //
// // export const onChangeEducationLevel = (educationLevel: ISelectItem): ThunkAction<void, IRootState, void, Action> => (
// // 	dispatch,
// // 	getState,
// // ) => {
// // 	const { currentFilial, currentInstitute } = applicationFormSelector(getState());
// // 	dispatch(changeCurrentEducationLevel(educationLevel));
// //
// // 	if (currentFilial && currentInstitute) {
// // 		dispatch(
// // 			fetchPriemDirectionsTransaction({
// // 				filialId: currentFilial.id,
// // 				instituteId: currentInstitute.id,
// // 				educationLevelId: educationLevel.id,
// // 			}),
// // 		).then(response => {
// // 			console.log('fetchPriemDirectionsTransaction', response);
// // 		});
// // 	}
// // };
// //
// // export const onChangeDirection = (direction: ISelectItem): ThunkAction<void, IRootState, void, Action> => (
// // 	dispatch,
// // 	getState,
// // ) => {
// // 	const { currentFilial, currentInstitute } = applicationFormSelector(getState());
// // 	dispatch(changeCurrentDirection(direction));
// //
// // 	if (currentFilial && currentInstitute) {
// // 		dispatch(
// // 			fetchPriemProfilesTransaction({
// // 				filialId: currentFilial.id,
// // 				instituteId: currentInstitute.id,
// // 				directionId: direction.id,
// // 			}),
// // 		).then(response => {
// // 			console.log('fetchPriemProfilesTransaction', response);
// // 		});
// // 	}
// // };
// //
// // export const onChangeProfile = (profile: ISelectItem): ThunkAction<void, IRootState, void, Action> => (
// // 	dispatch,
// // 	getState,
// // ) => {
// // 	const { currentFilial, currentInstitute, currentDirection } = applicationFormSelector(getState());
// // 	dispatch(changeCurrentProfile(profile));
// //
// // 	if (currentFilial && currentInstitute && currentDirection) {
// // 		dispatch(
// // 			fetchPriemEducationFormsTransaction({
// // 				filialId: currentFilial.id,
// // 				instituteId: currentInstitute.id,
// // 				directionId: currentDirection.id,
// // 				profileId: profile.id,
// // 			}),
// // 		).then(response => {
// // 			console.log('fetchPriemProfilesTransaction', response);
// // 		});
// // 	}
// // };
// //
// // export const onChangeEducationForm = (educationForm: ISelectItem): ThunkAction<void, IRootState, void, Action> => (
// // 	dispatch,
// // 	getState,
// // ) => {
// // 	const state = getState();
// //
// // 	const { currentFilial, currentInstitute, currentDirection, currentProfile } = applicationFormSelector(state);
// //
// // 	dispatch(changeCurrentEducationForm(educationForm));
// //
// // 	if (currentFilial && currentInstitute && currentDirection && currentProfile) {
// // 		dispatch(
// // 			fetchPriemPayFormsTransaction({
// // 				filialId: currentFilial.id,
// // 				instituteId: currentInstitute.id,
// // 				directionId: currentDirection.id,
// // 				profileId: currentProfile.id,
// // 				educationFormId: educationForm.id,
// // 			}),
// // 		).then(response => {
// // 			console.log('fetchPriemPayFormsTransaction', response);
// // 		});
// // 	}
// // };
// //
// // export const onChangePayForm = (payForms: ISelectItem[]): ThunkAction<void, IRootState, void, Action> => (
// // 	dispatch,
// // 	getState,
// // ) => {
// // 	dispatch(changeCurrentPayForm(payForms));
// // 	console.log('payForms', payForms);
// // 	const {
// // 		currentFilial,
// // 		currentInstitute,
// // 		currentDirection,
// // 		currentEducationForm,
// // 		currentEducationLevel,
// // 		currentProfile,
// // 	} = applicationFormSelector(getState());
// // 	if (
// // 		currentFilial &&
// // 		currentProfile &&
// // 		currentInstitute &&
// // 		currentEducationLevel &&
// // 		currentDirection &&
// // 		currentEducationForm
// // 	) {
// // 		dispatch(updatePriemGroups([]));
// // 		payForms.forEach(item => {
// // 			dispatch(
// // 				fetchPriemGroupsTransaction({
// // 					filialId: currentFilial.id,
// // 					instituteId: currentInstitute.id,
// // 					directionId: currentDirection.id,
// // 					finFormId: item.id,
// // 					educationFormId: currentEducationForm.id,
// // 				}),
// // 			).then(data => {
// // 				dispatch(updatePriemGroups([...applicationFormSelector(getState()).priemGroups, data]));
// // 				dispatch(setPriemGroupNeedDocument(data.needDoc));
// // 			});
// // 		});
// // 	}
// // };
// //
// // export const addPriemApplication = (): ThunkAction<void, IRootState, void, Action> => (dispatch, getState) => {
// // 	const state = getState();
// // 	const {
// // 		currentFilial,
// // 		currentInstitute,
// // 		currentProfile,
// // 		currentDirection,
// // 		currentEducationForm,
// // 		currentEducationLevel,
// // 		currentPayForms,
// // 	} = applicationFormSelector(state);
// // 	if (
// // 		currentFilial &&
// // 		currentInstitute &&
// // 		currentEducationLevel &&
// // 		currentDirection &&
// // 		currentProfile &&
// // 		currentEducationForm &&
// // 		currentPayForms
// // 	) {
// // 		currentPayForms.forEach((item, index) => {
// // 			const priemGroup = fromTransaction.fetchPriemGroups(state).result[index];
// // 			dispatch(
// // 				addPriemApplicationAction({
// // 					filial: currentFilial,
// // 					institute: currentInstitute,
// // 					educationLevel: currentEducationLevel,
// // 					direction: currentDirection,
// // 					profile: currentProfile,
// // 					payForm: item,
// // 					educationForm: currentEducationForm,
// // 					...priemGroup,
// // 				}),
// // 			);
// // 		});
// // 	}
// // 	dispatch(fetchPriemProfilesActions.success([]));
// // 	dispatch(fetchPriemEducationFormsActions.success([]));
// // 	dispatch(fetchPriemPayFormsActions.success([]));
// // };
// //
// // export const onDeleteApplication = (index: number): ThunkAction<void, IRootState, void, Action> => dispatch => {
// // 	dispatch(deleteApplication(index));
// // };
// // export const createNewPersonFolder = (): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
// // 	return dispatch(createPerson())
// // 		.then(() => {
// // 			return Promise.all([
// // 				dispatch(uploadDocList()),
// // 				dispatch(updatePhone()),
// // 				dispatch(updateAddress()),
// // 				dispatch(createPriemApplications()),
// // 			])
// // 				.then(() => Promise.resolve())
// // 				.catch(error => {
// // 					console.log('createNewPersonFolder', error);
// //
// // 					return Promise.reject();
// // 				});
// // 		})
// // 		.catch(error => {
// // 			console.log('createNewPersonFolder', error);
// //
// // 			return Promise.reject();
// // 		});
// // };
// // export const createPriemApplications = (): ThunkAction<Promise<void>, IRootState, void, Action> => (
// // 	dispatch,
// // 	getState,
// // ) => {
// // 	const priemList = applicationFormSelector(getState()).applications;
// //
// // 	return Promise.all(
// // 		priemList.map((application, index) => {
// // 			return dispatch(
// // 				createPriemApplicationTransaction({
// // 					admId: application.admId,
// // 					priority: index + 1,
// // 					profileId: application.profile.id,
// // 				}),
// // 			);
// // 		}),
// // 	)
// // 		.then(() => {
// // 			return Promise.resolve();
// // 		})
// // 		.catch(() => {
// // 			return Promise.reject();
// // 		});
// // };
