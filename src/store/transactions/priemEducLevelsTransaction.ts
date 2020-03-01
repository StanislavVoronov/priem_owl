import { TRANSACTION_NAMES } from '$common';
import { createSelector, createTransactionActions, createTransactionReducer, prop } from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';

export const priemEducLevelsTransactionActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemEducationLevels);

export const priemEducLevelsReducer = createTransactionReducer(priemEducLevelsTransactionActions);

export const priemEducLevelsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemEducLevels,
);
