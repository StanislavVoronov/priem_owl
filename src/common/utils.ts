import { Action, createAction } from 'redux-actions';
import { IDictionaryItem, IServerError } from '$common';
import { ChangeEvent } from 'react';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { IEnrollRegisterStateForm } from '$common';

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
	return event.target.value.trim();
};

export const createTransactionActions = <T>(nameSpace: string) => {
	return {
		request: createAction(`${nameSpace}/transactionRequest`),
		success: createAction(`${nameSpace}/transactionSuccess`, (result: T[]) => result),
		failure: createAction(`${nameSpace}/transactionFailure`, (error: IServerError) => error),
	};
};
