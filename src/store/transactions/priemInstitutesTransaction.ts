import { createTransactionReducer, priemInstitutesTransactionActions } from '$common';
import { createSelector, prop } from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';

export const priemInstitutesReducer = createTransactionReducer(priemInstitutesTransactionActions);

export const priemInstitutesTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemInstitutes,
);
