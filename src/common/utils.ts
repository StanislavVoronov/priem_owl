import { Action } from 'redux-actions';
import { IDictionaryItem } from './models/common';
import { ChangeEvent } from 'react';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { IRegisterForm } from '$common';

export const checkPayload = <State, Payload>(action: Action<any>, callback: (data: Payload) => State) => {
	const data = action.payload;

	return callback(data);
};

export const prepareDictionarySuggestions = <T extends IDictionaryItem>(dictionary: { values: T[] }) => {
	if (!dictionary || !Array.isArray(dictionary.values)) {
		return [];
	}

	return dictionary.values.map((item: T) => item.name);
};

export const inputValueAsNumber = (event: ChangeEvent<HTMLInputElement>): number => {
	return event.target.valueAsNumber;
};

export const inputValueAsString = (event: ChangeEvent<HTMLInputElement>): string => {
	return event.target.value;
};

export const validateRegistrationForm = (fields: IRegisterForm) => {
	const invalidData: Partial<IRegisterForm> = {};

	if (fields.login.length > 0 && fields.login.length < 7) {
		invalidData.login = 'Логин должен быть не менее 7 символов';
	}

	if (fields.password.length > 0 && fields.password.length < 10) {
		invalidData.password = 'Логин должен быть не менее 10 символов';
	}
	if (fields.password.length > 0 && fields.repeatPassword.length > 0 && fields.password !== fields.repeatPassword) {
		invalidData.repeatPassword = 'Пароли не совпадают';
	}

	return invalidData;
};
