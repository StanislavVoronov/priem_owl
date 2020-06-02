import {
	createTransactionReducer,
	createTransactionActions,
	createSelector,
	sagaEffects,
} from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$common';
import { createLoginRest, ICreateLoginResponse } from '$rests';
import { transactionSelector } from './selectors';

export const createLoginTransactionActions = createTransactionActions<
	ICreateLoginResponse,
	{ login: string; password: string }
>(TRANSACTION_NAMES.CreateLogin);

export const createLoginReducer = createTransactionReducer(createLoginTransactionActions);

export const createLoginTransactionSelector = createSelector(transactionSelector, (state) => {
	const { isFetching, exception, result } = state.createLogin;
	const npId = result.id || 0;

	return { isFetching, exception, result: npId };
});

export const createLoginSaga = sagaEffects.transaction(createLoginTransactionActions, (payload) =>
	createLoginRest(payload.login, payload.password),
);
