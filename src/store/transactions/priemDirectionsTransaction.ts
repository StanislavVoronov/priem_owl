import { TRANSACTION_NAMES } from '$common';
import { ITransactionsState } from './transactionsModels';
import { createSelector, createTransactionActions, prop, createTransactionReducer } from '@black_bird/utils';

export const priemDirectionsTransactionActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemDirections);

export const priemDirectionsReducer = createTransactionReducer(priemDirectionsTransactionActions);

export const priemDirectionsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemDirections,
);
