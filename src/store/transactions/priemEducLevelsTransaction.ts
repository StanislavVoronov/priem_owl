import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import { createSelector, createTransactionActions, createTransactionReducer, prop } from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';

export const priemEducLevelsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemEducationLevels,
	(filial: IAdmDictionaryItem, inst: IAdmDictionaryItem, educLevel: IAdmDictionaryItem) => ({ filial, inst, educLevel }),
);

export const priemEducLevelsReducer = createTransactionReducer(priemEducLevelsTransactionActions);

export const priemEducLevelsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemEducLevels,
);
