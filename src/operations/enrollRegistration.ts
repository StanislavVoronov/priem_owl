import {
	checkLoginTransaction,
	createLoginTransaction,
	fromTransaction,
	IRootState,
	enrollRegistrationSelector,
	findPersonTransaction,
} from '$store';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { createLoginActions, cyrillToLatin, generatePassword } from '$common';

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

	dispatch(findPersonTransaction(data));

	if (fromTransaction.findPersonSelector(getState()).result) {
		return Promise.reject();
	} else {
		return Promise.resolve();
	}
};
