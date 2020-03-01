import { TRANSACTION_NAMES } from '$common';
import { createSelector, createTransactionActions, prop, createTransactionReducer } from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';

export const priemProfilesTransactionActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemProfiles);

export const priemEducFormsReducer = createTransactionReducer(priemProfilesTransactionActions);

export const priemEducFormsTransactionSelector = createSelector(
	prop("transactions"),
	(state: ITransactionsState) => state.priemEducForms,
);
