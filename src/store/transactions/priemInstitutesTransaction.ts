import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import { createSelector, createTransactionActions, prop, createTransactionReducer } from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';

export const priemInstitutesTransactionActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemInstitutes, (item: IAdmDictionaryItem)=> item);

export const priemInstitutesReducer = createTransactionReducer(priemInstitutesTransactionActions);

export const priemInstitutesTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemInstitutes,
);
