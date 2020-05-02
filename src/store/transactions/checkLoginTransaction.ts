import {
	createTransactionReducer,
	createTransactionActions,
	createSelector,
	sagaEffects,
} from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$common';
import { checkLoginRest } from '$rests';
import { transactionSelector } from './selectors';

export const checkLoginTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CheckLogin,
	(login: string) => ({
		login,
	}),
);

export const checkLoginReducer = createTransactionReducer(checkLoginTransactionActions);

export const isUniqueLoginTransactionSelector = createSelector(transactionSelector, (state) => {
	const { isFetching, exception, result }: any = state.checkLogin;

	return { isFetching, exception, result: result.length ? result[0].COUNT === 0 : false };
});

export const checkLoginSaga = sagaEffects.rest(checkLoginTransactionActions, (payload) =>
	checkLoginRest(payload.login),
);
