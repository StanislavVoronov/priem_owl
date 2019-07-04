import { Action, createAction, handleActions } from 'redux-actions';
import {
	IApplication,
	IDictionaryItem,
	initialTransactionState,
	IServerError,
	ITransaction,
	ITransactionActions,
} from '$common';
import { ChangeEvent } from 'react';
import { ARRAY_ENG_ALPHABET, ARRAY_RUS_ALPHABET } from './constants';

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
		success: createAction(`${nameSpace}/transactionSuccess`, (result: T[]) => ({ result })),
		failure: createAction(`${nameSpace}/transactionFailure`, (error: IServerError) => ({ error })),
	};
};

export const createTransactionActionsById = <T>(nameSpace: string) => {
	return {
		request: createAction(`${nameSpace}/transactionRequest`, (id: string | number) => ({ id })),
		success: createAction(`${nameSpace}/transactionSuccess`, (id: string | number, result: T[]) => ({ result, id })),
		failure: createAction(`${nameSpace}/transactionFailure`, (id: string | number, error: IServerError) => ({
			error,
			id,
		})),
	};
};

export const createTransactionReducer = <R, S, F>(actions: ITransactionActions<R, S, F>) => {
	return handleActions<ITransaction<S>>(
		{
			[actions.request.toString()]: () => ({
				result: [],
				loading: true,
				error: null,
			}),
			[actions.success.toString()]: (state, action) => {
				return { ...state, loading: false, result: action.payload.result || [] };
			},
			[actions.failure.toString()]: (state, action) => ({
				...state,
				loading: false,
				error: action.payload ? action.payload.error : null,
			}),
		},
		initialTransactionState,
	);
};

export const cyrillToLatin = (text: string) => {
	ARRAY_RUS_ALPHABET.forEach((letter, index) => {
		const reg = new RegExp(ARRAY_RUS_ALPHABET[index], 'g');
		text = text.replace(reg, ARRAY_ENG_ALPHABET[index]);
	});

	return text.toLowerCase();
};

export const generatePassword = () => {
	return Math.random()
		.toString(36)
		.slice(-8);
};

export const mergeSchemes = (...schemas: any[]) => {
	const [first, ...rest] = schemas;

	const merged = rest.reduce((mergedSchemas, schema) => mergedSchemas.concat(schema), first);

	return merged;
};

export const disabledAddNewApplication = (applications: IApplication[]): boolean => {
	return new Set(applications.map(item => item.direction.id)).size > 2;
};
