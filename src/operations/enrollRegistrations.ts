import {
	checkLoginTransaction,
	fromEnrollRegistration,
	createLoginTransaction,
	fromTransaction,
	IRootState,
} from '$store';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { cyrillToLatin, generatePassword } from '$common';

export const enrollCreateNewLogin = (): ThunkAction<Promise<void>, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const state = getState();
	const { data } = fromEnrollRegistration.enrollRegistrationSelector(state);
	const lastName = cyrillToLatin(data.lastName);
	const firstName = cyrillToLatin(data.firstName);
	const middleName = cyrillToLatin(data.middleName);
	let login = '';
	let firstPart = '';
	const password = generatePassword();

	Array.from(firstName).some(firstLetter => {
		firstPart += firstLetter;
		login = `${lastName}.${firstPart}.`;

		return Array.from(middleName).some(secondLetter => {
			login += secondLetter;

			dispatch(checkLoginTransaction(login));

			return fromTransaction.checkLoginSelector(getState()).result;
		});
	});

	return dispatch(createLoginTransaction(login, password));
};
