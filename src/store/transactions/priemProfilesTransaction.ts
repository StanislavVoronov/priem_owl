import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import { createSelector, createTransactionActions, createTransactionReducer, prop } from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';

export const priemProfilesTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemProfiles,
	(filial: IAdmDictionaryItem, inst: IAdmDictionaryItem, direction: IAdmDictionaryItem) => ({
		filial,
		inst,
		direction,
	}),
);
export const priemProfilesReducer = createTransactionReducer(priemProfilesTransactionActions);

export const priemProfilesTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemProfiles,
);
