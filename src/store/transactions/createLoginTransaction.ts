import { createTransactionReducer, createTransactionActions, createSelector, prop } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { ITransactionsState } from './transactionsModels';

export const createLoginTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreateLogin,
	(login: string, password: string) => ({ login, password }),
);

export const createLoginReducer = createTransactionReducer(createLoginTransactionActions);

export const createLoginTransactionSelector = createSelector(prop('transactions'), (state: ITransactionsState) => {
	const { isFetching, exception, result } = state.createLogin;
	const npId = result.length > 0 ? result[0].id : 0;

	return { isFetching, exception, result: npId };
});
