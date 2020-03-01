import { createSelector, prop } from '@black_bird/utils';
import { createTransactionReducer, updatePhoneActionsByKey } from '$common';
import { ITransactionsState } from './transactionsModels';

export const updatePhoneReducer = createTransactionReducer(updatePhoneActionsByKey);

export const updatePhoneTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.findPerson,
);
