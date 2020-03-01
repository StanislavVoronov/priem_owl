import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import { ITransactionsState } from './transactionsModels';
import { createSelector, createTransactionActions, prop, createTransactionReducer } from '@black_bird/utils';

export const priemPayFormsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemPayForms,
	(
		filial: IAdmDictionaryItem,
		inst: IAdmDictionaryItem,
		direction: IAdmDictionaryItem,
		educForms: IAdmDictionaryItem[],
	) => ({
		filial,
		inst,
		direction,
		educForms,
	}),
);

export const priemPayFormsReducer = createTransactionReducer(priemPayFormsTransactionActions);

export const priemPayFormsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemPayForms,
);
