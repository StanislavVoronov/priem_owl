import {
	createTransactionReducer,
	createTransactionActions,
	createSelector,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { ITransactionsState } from './transactionsModels';
import { checkLoginRest } from '$rests';

export const checkLoginTransactionActions = createTransactionActions(TRANSACTION_NAMES.CheckLogin, (login: string) => ({
	login,
}));

export const checkLoginReducer = createTransactionReducer(checkLoginTransactionActions);

export const isUniqueLoginTransactionSelector = createSelector(prop('transactions'), (state: ITransactionsState) => {
	const { isFetching, exception, result }: any = state.checkLogin;

	return { isFetching, exception, result: result.length ? result[0].COUNT === 0 : false };
});

export const checkLoginSaga = sagaEffects.rest(checkLoginTransactionActions, ({ payload }) =>
	checkLoginRest(payload.login),
);
