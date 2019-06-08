import {
	checkLoginTransaction,
	createLoginTransaction,
	fromTransaction,
	IRootState,
	enrollRegistrationSelector,
	findPersonTransaction,
	createVerificationCodeTransaction,
	enrollContactsFormSelector,
	enrollPersonFormSelector,
	enrollEducationFormSelector,
	enrollAccountVerificationFormSelector,
	uploadDocumentTransaction,
	createPersonTransaction,
	enrollDocumentsFormSelector,
	enrollSubmitRegFormAction,
} from '$store';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { createLoginActions, cyrillToLatin, generatePassword, IEnrollRegForm, moment, ServerBoolean } from '$common';
import { updatePhoneTransaction } from '../../store/transactions/updatePhone';
export const onCompleteRegistrationForm = (
	form: IEnrollRegForm,
): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
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
				if (fromTransaction.isUniqueLoginSelector(getState()).result) {
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
		if (fromTransaction.findPersonSelector(getState()).result) {
			return Promise.reject();
		} else {
			return Promise.resolve();
		}
	});
};

export const createVerificationCode = (): ThunkAction<Promise<void>, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const { data } = enrollContactsFormSelector(getState());

	return dispatch(createVerificationCodeTransaction(data.email, data.mobPhone, 1));
};

export const updatePhone = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const { data } = enrollContactsFormSelector(getState());

	return Promise.all([
		dispatch(
			updatePhoneTransaction({
				phone: data.mobPhone || '',
				type: 2,
			}),
		),
		dispatch(
			updatePhoneTransaction({
				phone: data.homePhone || '',
				type: 1,
			}),
		),
	])
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

export const createPerson = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const state = getState();
	const registrationForm = enrollRegistrationSelector(state);
	const contactsForm = enrollContactsFormSelector(state).data;
	const personForm = enrollPersonFormSelector(state);
	const educationForm = enrollEducationFormSelector(state).data;
	const accountVerificationForm = enrollAccountVerificationFormSelector(state).data;

	const payload = {
		email_code: accountVerificationForm.verificationCode,
		phone_code: '000000',
		email: contactsForm.email,
		lname: registrationForm.lastName,
		fname: registrationForm.firstName,
		mname: registrationForm.middleName,
		birthdate: moment(registrationForm.birthday).format('DD-MM-YYYY'),
		birthplace: personForm.birthPlace,
		need_hostel: contactsForm.needDormitory ? ServerBoolean.True : ServerBoolean.False,
		sex: registrationForm.gender,
		hight_first: educationForm.firstHighEducation ? ServerBoolean.True : ServerBoolean.False,
		best_prev_edu: educationForm.prevEducation,
		cheat_type: 0,
	};

	return dispatch(createPersonTransaction(payload)).then(() => Promise.resolve());
};
export const uploadDocList = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const state = getState();

	const contactsData = enrollContactsFormSelector(state).data;
	const personData = enrollPersonFormSelector(state);
	const educationData = enrollEducationFormSelector(state).data;
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

export const updatePersonInformation = (): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	return dispatch(createPerson())
		.then(() => {
			return Promise.all([dispatch(uploadDocList()), dispatch(updatePhone())]);
		})
		.then(() => Promise.resolve());
};
