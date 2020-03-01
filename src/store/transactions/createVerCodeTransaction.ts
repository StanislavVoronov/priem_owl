import { createTransactionActions, createTransactionReducer } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { ITransactionsState } from './transactionsModels';
import { createSelector, prop } from '@black_bird/utils';

export const createVerCodeTransactionActions = createTransactionActions(TRANSACTION_NAMES.CreateVerificationCode);
export const createVerCodeReducer = createTransactionReducer(createVerCodeTransactionActions);

export const createVerCodeTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.createVerCode,
);
