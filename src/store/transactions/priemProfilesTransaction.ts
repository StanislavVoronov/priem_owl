import { TRANSACTION_NAMES } from '$common';

import { createSelector, createTransactionActions, createTransactionReducer, prop } from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';

export const priemProfilesTransactionActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemProfiles);
export const priemProfilesReducer = createTransactionReducer(priemProfilesTransactionActions);

export const priemProfileTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemProfiles,
);
