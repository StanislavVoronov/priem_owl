import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import { ITransactionsState } from './transactionsModels';
import { createSelector, createTransactionActions, prop, createTransactionReducer } from '@black_bird/utils';

export const priemDirectionsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemDirections,
	(filial: IAdmDictionaryItem, educLevel: IAdmDictionaryItem, inst: IAdmDictionaryItem) => ({ filial, inst, educLevel }),
);

export const priemDirectionsReducer = createTransactionReducer(priemDirectionsTransactionActions);

export const priemDirectionsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemDirections,
);
