import {
	checkLoginTransaction,
	createLoginTransaction,
	createPersonTransaction,
	createVerificationCodeTransaction,
	enrollAccountVerificationFormSelector,
	enrollApplicationsFormSelector,
	enrollContactsFormSelector,
	enrollDocumentsFormSelector,
	enrollEducationFormSelector,
	enrollPersonFormSelector,
	enrollRegistrationSelector,
	enrollSubmitRegFormAction,
	findPersonTransaction,
	fromTransaction,
	IRootState,
	selectVerificationMethod,
	uploadDocumentTransaction,
	changeCurrentFilial,
	changeCurrentInstitute,
	changeCurrentEducationLevel,
	changeCurrentDirection,
	changeCurrentPayForm,
	changeCurrentProfile,
	changeCurrentEducationForm,
	addPriemApplication as addPriemApplicationAction,
	deleteApplication,
} from '$store';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import {
	createLoginActions,
	cyrillToLatin,
	generatePassword,
	IEnrollRegForm,
	moment,
	ServerBoolean,
	VerificationMethod,
	ISelectItem,
	fetchPriemProfilesActions,
	fetchPriemPayFormsActions,
	fetchPriemEducationFormsActions,
} from '$common';
import { updatePhoneTransaction } from '../../store/transactions/updatePhone';
import { updateAddressTransaction } from '../../store/transactions/updateAddress';
import { fetchPriemFilialsTransaction } from '../../store/transactions/fetchPriemFilials';

import { fetchPriemInstitutesTransaction } from '../../store/transactions/fetchPriemInstitutes';
import { fetchPriemEducationLevelsTransaction } from '../../store/transactions/fetchPriemEducationLevels';
import { fetchPriemDirectionsTransaction } from '../../store/transactions/fetchPriemDirections';
import { fetchPriemProfilesTransaction } from '../../store/transactions/fetchPriemProfiles';
import { fetchPriemEducationFormsTransaction } from '../../store/transactions/fetchPriemEducationForms';
import { fetchPriemPayFormsTransaction } from '../../store/transactions/fetchPriemPayForms';

export const onCompleteRegistrationForm = (
	form: IEnrollRegForm,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	dispatch(enrollSubmitRegFormAction(form));

	return dispatch(enrollCreateNewLogin()).then(() => {
		return dispatch(findPerson());
	});
};
export const enrollCreateNewLogin = (): ThunkAction<Promise<void>, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const state = getState();
	const data = enrollRegistrationSelector(state);
	const lastName = cyrillToLatin(data.lastName);
	const firstName = cyrillToLatin(data.firstName);
	const middleName = cyrillToLatin(data.middleName);

	let firstPart = '';
	const password = generatePassword();
	const firstNameList = Array.from(firstName);
	const secondNameList = Array.from(middleName);
	const generateLogin = async () => {
		for (const firstLetter of firstNameList) {
			firstPart += firstLetter;
			let login = `${lastName}.${firstPart}.`;
			for (const secondLetter of secondNameList) {
				login += secondLetter;
				await dispatch(checkLoginTransaction(login));
				if (fromTransaction.isUniqueLogin(getState()).result) {
					return Promise.resolve(login);
				}
			}
		}

		return Promise.reject("Не сформировать уникальный логин'");
	};

	return generateLogin()
		.then(login => {
			if (login) {
				return dispatch(createLoginTransaction(login, password));
			}
			throw new Error('Не удалось сформировать уникальный логин');
		})
		.catch(error => {
			dispatch(createLoginActions.failure({ message: error }));
		});
};

export const findPerson = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const data = enrollRegistrationSelector(getState());

	return dispatch(findPersonTransaction(data)).then(() => {
		if (fromTransaction.findPerson(getState()).result) {
			return Promise.reject();
		} else {
			return Promise.resolve();
		}
	});
};

export const sendVerificationCodeToPhone = (): ThunkAction<Promise<void>, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const data = enrollContactsFormSelector(getState());

	dispatch(selectVerificationMethod(VerificationMethod.Phone));

	return dispatch(createVerificationCodeTransaction(data.email, data.mobPhone, VerificationMethod.Phone));
};

export const sendVerificationCodeToEmail = (): ThunkAction<Promise<void>, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const data = enrollContactsFormSelector(getState());

	dispatch(selectVerificationMethod(VerificationMethod.Email));

	return dispatch(createVerificationCodeTransaction(data.email, data.mobPhone, VerificationMethod.Email));
};

export const updatePhone = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const data = enrollContactsFormSelector(getState());

	return data.homePhone
		? dispatch(
				updatePhoneTransaction({
					phone: data.homePhone,
					type: 1,
				}),
		  )
		: Promise.resolve();
};

const createPerson = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const state = getState();
	const registrationForm = enrollRegistrationSelector(state);
	const contactsForm = enrollContactsFormSelector(state);
	const personForm = enrollPersonFormSelector(state);
	const educationForm = enrollEducationFormSelector(state);
	const accountVerificationForm = enrollAccountVerificationFormSelector(state);

	const emailCode =
		accountVerificationForm.verificationMethod === VerificationMethod.Email
			? accountVerificationForm.verificationCode
			: '000000';

	const phoneCode =
		accountVerificationForm.verificationMethod === VerificationMethod.Phone
			? accountVerificationForm.verificationCode
			: '000000';

	const payload = {
		email_code: emailCode,
		phone_code: phoneCode,
		lname: registrationForm.lastName,
		fname: registrationForm.firstName,
		mname: registrationForm.middleName,
		birthdate: moment(registrationForm.birthday).format('DD-MM-YYYY'),
		birthplace: personForm.birthPlace,
		need_hostel: contactsForm.needDormitory ? ServerBoolean.True : ServerBoolean.False,
		sex: Number(registrationForm.gender),
		hight_first: educationForm.firstHighEducation ? ServerBoolean.True : ServerBoolean.False,
		best_prev_edu: educationForm.prevEducation,
		cheat_type: 0,
	};

	return dispatch(createPersonTransaction(payload));
};
const uploadDocList = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const state = getState();

	const contactsData = enrollContactsFormSelector(state);
	const personData = enrollPersonFormSelector(state);
	const educationData = enrollEducationFormSelector(state);
	const documents = [contactsData, personData, educationData, ...enrollDocumentsFormSelector(state)];

	return Promise.all(
		documents.map(document => {
			return dispatch(uploadDocumentTransaction(document));
		}),
	)
		.then(() => {
			return Promise.resolve();
		})
		.catch(() => {
			return Promise.reject();
		});
};

const updateAddress = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const {
		regIndex,
		regRegion,
		regLocality,
		regStreet,
		regHome,
		regBlock,
		regFlat,
		liveBlock,
		liveFlat,
		liveHome,
		liveIndex,
		liveLocality,
		liveRegion,
		liveStreet,
		isRegAddressEqualLive,
	} = enrollContactsFormSelector(getState());
	const adressDictionary = [
		'индекс: ',
		'область/регион: ',
		'город/поселок: ',
		'улица: ',
		'дом: ',
		'корпус: ',
		'квартира: ',
	];

	const regAddress = [regIndex, regRegion, regLocality, regStreet, regHome, regBlock, regFlat].filter(value => value);

	const liveAddress = [liveIndex, liveRegion, liveLocality, liveStreet, liveHome, liveBlock, liveFlat].filter(
		value => value,
	);

	return Promise.all([
		dispatch(updateAddressTransaction({ address: regAddress.join(', '), type: 1 })),
		!isRegAddressEqualLive
			? dispatch(updateAddressTransaction({ address: liveAddress.join(', '), type: 2 }))
			: Promise.resolve(),
	]).then(() => Promise.resolve());
};

export const updatePersonInformation = (): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	return dispatch(createPerson())
		.then(() => {
			return Promise.all([dispatch(uploadDocList()), dispatch(updatePhone()), dispatch(updateAddress())]);
		})
		.then(() => Promise.resolve());
};

export const fetchPriemFilials = (): ThunkAction<void, IRootState, void, Action> => dispatch => {
	dispatch(fetchPriemFilialsTransaction()).then(response => {
		dispatch(onChangeFilial(response[0]));
	});
};

export const onChangeFilial = (filial: ISelectItem): ThunkAction<void, IRootState, void, Action> => dispatch => {
	dispatch(changeCurrentFilial(filial));
	dispatch(fetchPriemInstitutesTransaction(filial.id)).then(response => {
		console.log('InstitutesTransaction', response);
	});
};

export const onChangeInstitute = (institute: ISelectItem): ThunkAction<void, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const { currentFilial } = enrollApplicationsFormSelector(getState());
	dispatch(changeCurrentInstitute(institute));

	if (currentFilial) {
		dispatch(
			fetchPriemEducationLevelsTransaction({
				filialId: currentFilial.id,
				instituteId: institute.id,
			}),
		).then(response => {
			console.log('fetchPriemEducationLevelsTransaction', response);
		});
	}
};

export const onChangeEducationLevel = (educationLevel: ISelectItem): ThunkAction<void, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const { currentFilial, currentInstitute } = enrollApplicationsFormSelector(getState());
	dispatch(changeCurrentEducationLevel(educationLevel));

	if (currentFilial && currentInstitute) {
		dispatch(
			fetchPriemDirectionsTransaction({
				filialId: currentFilial.id,
				instituteId: currentInstitute.id,
				educationLevelId: educationLevel.id,
			}),
		).then(response => {
			console.log('fetchPriemDirectionsTransaction', response);
		});
	}
};

export const onChangeDirection = (direction: ISelectItem): ThunkAction<void, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const { currentFilial, currentInstitute, currentEducationForm } = enrollApplicationsFormSelector(getState());
	dispatch(changeCurrentDirection(direction));

	if (currentFilial && currentInstitute) {
		dispatch(
			fetchPriemProfilesTransaction({
				filialId: currentFilial.id,
				instituteId: currentInstitute.id,
				directionId: direction.id,
			}),
		).then(response => {
			console.log('fetchPriemProfilesTransaction', response);
		});
	}
};

export const onChangeProfile = (profile: ISelectItem): ThunkAction<void, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const { currentFilial, currentInstitute, currentDirection, currentProfile } = enrollApplicationsFormSelector(
		getState(),
	);
	dispatch(changeCurrentProfile(profile));

	if (currentFilial && currentInstitute && currentDirection) {
		dispatch(
			fetchPriemEducationFormsTransaction({
				filialId: currentFilial.id,
				instituteId: currentInstitute.id,
				directionId: currentDirection.id,
				profileId: profile.id,
			}),
		).then(response => {
			console.log('fetchPriemProfilesTransaction', response);
		});
	}
};

export const onChangeEducationForm = (educationForm: ISelectItem): ThunkAction<void, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const {
		currentFilial,
		currentInstitute,
		currentEducationForm,
		currentDirection,
		currentProfile,
	} = enrollApplicationsFormSelector(getState());
	dispatch(changeCurrentEducationForm(educationForm));

	if (currentFilial && currentInstitute && currentDirection && currentProfile) {
		dispatch(
			fetchPriemPayFormsTransaction({
				filialId: currentFilial.id,
				instituteId: currentInstitute.id,
				directionId: currentDirection.id,
				profileId: currentProfile.id,
				educationFormId: educationForm.id,
			}),
		).then(response => {
			console.log('fetchPriemPayFormsTransaction', response);
		});
	}
};

export const onChangePayForm = (payForm: ISelectItem): ThunkAction<void, IRootState, void, Action> => dispatch => {
	dispatch(changeCurrentPayForm(payForm));
};

export const addPriemApplication = (): ThunkAction<void, IRootState, void, Action> => (dispatch, getState) => {
	const {
		currentFilial,
		currentInstitute,
		currentProfile,
		currentDirection,
		currentEducationForm,
		currentEducationLevel,
		currentPayForm,
	} = enrollApplicationsFormSelector(getState());
	if (
		currentFilial &&
		currentInstitute &&
		currentEducationLevel &&
		currentDirection &&
		currentProfile &&
		currentEducationForm &&
		currentPayForm
	) {
		dispatch(
			addPriemApplicationAction({
				filial: currentFilial,
				institute: currentInstitute,
				educationLevel: currentEducationLevel,
				direction: currentDirection,
				profile: currentProfile,
				payForm: currentPayForm,
				educationForm: currentEducationForm,
			}),
		);
	}
	dispatch(fetchPriemProfilesActions.success([]));
	dispatch(fetchPriemEducationFormsActions.success([]));
	dispatch(fetchPriemPayFormsActions.success([]));
};

export const onDeleteApplication = (index: number): ThunkAction<void, IRootState, void, Action> => dispatch => {
	dispatch(deleteApplication(index));
};

export const createPriemApplication = (): ThunkAction<void, IRootState, void, Action> => dispatch => {};
