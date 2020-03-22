import {
	createTransactionReducer,
	createTransactionActions,
	createSelector,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { ITransactionsState } from './transactionsModels';
import { createLoginRest } from '$rests';

export const createLoginTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreateLogin,
	(login: string, password: string) => ({ login, password }),
);

export const createLoginReducer = createTransactionReducer(createLoginTransactionActions);

export const createLoginTransactionSelector = createSelector(prop('transactions'), (state: ITransactionsState) => {
	const { isFetching, exception, result } = state.createLogin;
	const npId = result.length ? result[0].id : 0;

	return { isFetching, exception, result: npId };
});

export const createLoginSaga = sagaEffects.rest(createLoginTransactionActions, ({ payload }) => {
	return createLoginRest(payload.login, payload.password);
});
