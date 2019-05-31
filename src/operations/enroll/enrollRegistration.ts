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
} from '$store';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { createLoginActions, cyrillToLatin, generatePassword, moment, ServerBoolean } from '$common';
import { IFindPersonResponse } from '../../store/transactions/findPerson';

export const enrollCreateNewLogin = (): ThunkAction<Promise<void>, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const state = getState();
	const { data } = enrollRegistrationSelector(state);
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
	const { data } = enrollRegistrationSelector(getState());

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

export const createPerson = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const state = getState();
	const registrationForm = enrollRegistrationSelector(state).data;
	const contactsForm = enrollContactsFormSelector(state).data;
	const personForm = enrollPersonFormSelector(state).data;
	const educationForm = enrollEducationFormSelector(state).data;
	const accountVerificationForm = enrollAccountVerificationFormSelector(state).data;
	const cheatType = enrollDocumentsFormSelector(getState()).data.cheatType;

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
		cheat_type: cheatType ? cheatType.id : 0,
	};

	return dispatch(createPersonTransaction(payload)).then(() => Promise.resolve());
};
export const uploadDocList = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const state = getState();
	const { data } = enrollDocumentsFormSelector(state);

	const { regDocument } = enrollContactsFormSelector(state).data;
	const { personDocument } = enrollPersonFormSelector(state).data;
	const { educationDocument } = enrollEducationFormSelector(state).data;
	const documents = [regDocument, personDocument, educationDocument, ...data.documents];

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
