import { createTransactionReducer, createTransactionActions, createSelector, prop } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { ITransactionsState } from './transactionsModels';

export const checkLoginTransactionActions = createTransactionActions(TRANSACTION_NAMES.CheckLogin, (login: string) => ({
	login,
}));

export const checkLoginReducer = createTransactionReducer(checkLoginTransactionActions);

export const isUniqueLoginTransactionSelector = createSelector(prop('transactions'), (state: ITransactionsState) => {
	const { isFetching, exception, result } = state.checkLogin;

	return { isFetching, exception, result: result.length ? result[0].COUNT === 0 : false };
});
