import { TRANSACTION_NAMES } from '$common';
import { ITransactionsState } from './transactionsModels';
import { createSelector, createTransactionActions, prop, createTransactionReducer } from '@black_bird/utils';

export const priemPayFormsTransactionActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemPayForms);

export const priemPayFormsReducer = createTransactionReducer(priemPayFormsTransactionActions);

export const priemPayFormTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemPayForms,
);
