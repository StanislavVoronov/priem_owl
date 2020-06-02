import {
	createTransactionReducer,
	createTransactionActions,
	createSelector,
	sagaEffects,
} from '@black_bird/utils';
import { AUTO_RETRY_REQUEST, TRANSACTION_NAMES } from '$common';
import { checkLoginRest, ICheckLoginResponse } from '$rests';
import { transactionSelector } from './selectors';

export const checkLoginTransactionActions = createTransactionActions<
	ICheckLoginResponse,
	{ login: string }
>(TRANSACTION_NAMES.CheckLogin);

export const checkLoginReducer = createTransactionReducer(checkLoginTransactionActions);

export const isUniqueLoginTransactionSelector = createSelector(transactionSelector, (state) => {
	const { isFetching, exception, result }: any = state.checkLogin;

	return { isFetching, exception, result: result.length ? result[0].COUNT === 0 : false };
});

export const checkLoginSaga = sagaEffects.transaction(
	checkLoginTransactionActions,
	(payload) => checkLoginRest(payload.login),
	AUTO_RETRY_REQUEST,
);
