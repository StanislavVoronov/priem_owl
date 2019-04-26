import { Action } from 'redux-actions';
import { IDictionaryItem } from './models';
import { ChangeEvent } from 'react';

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
