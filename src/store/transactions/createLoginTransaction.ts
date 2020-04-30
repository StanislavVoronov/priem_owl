import {
	createTransactionReducer,
	createTransactionActions,
	createSelector,
	sagaEffects,
} from '@black_bird/utils';
import { AUTO_REQUEST_RETRY, TRANSACTION_NAMES } from '$common';
import { createLoginRest } from '$rests';
import { transactionSelector } from './selectors';

export const createLoginTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreateLogin,
	(login: string, password: string) => ({ login, password }),
);

export const createLoginReducer = createTransactionReducer(createLoginTransactionActions);

export const createLoginTransactionSelector = createSelector(transactionSelector, (state) => {
	const { isFetching, exception, result } = state.createLogin;
	const npId = result.id || 0;

	return { isFetching, exception, result: npId };
});

export const createLoginSaga = sagaEffects.rest(
	createLoginTransactionActions,
	({ payload }) => createLoginRest(payload.login, payload.password),
	{
		autoRetry: AUTO_REQUEST_RETRY,
	},
);
