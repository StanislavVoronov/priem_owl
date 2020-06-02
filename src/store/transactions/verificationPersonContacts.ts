import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$common';
import { IVerPersonContactsResponse, verPersonContactsRest } from '$rests';
import { transactionSelector } from './selectors';

export const verPersonContactsTrnActions = createTransactionActions<
	IVerPersonContactsResponse,
	{ npId: number }
>(TRANSACTION_NAMES.VER_CONTACTS_PERSON);
export const verPersonContactsReducer = createTransactionReducer(verPersonContactsTrnActions);

export const verPersonContactsTrnSelector = createSelector(transactionSelector, (state) => ({
	...state.verPersonContacts,
	result: state.verPersonContacts.result[0],
}));

export const verPersonContactsTrnSaga = sagaEffects.transaction(
	verPersonContactsTrnActions,
	(payload) => verPersonContactsRest(payload.npId),
);
