import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { priemLogoutRest } from '$rests';
import { TRANSACTION_NAMES } from '$actions';
import { transactionSelector } from './selectors';

export const priemLogoutTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.PriemLogout,
);

export const priemLogoutReducer = createTransactionReducer(priemLogoutTransactionActions);

export const priemLogoutTransactionSelector = createSelector(
	transactionSelector,
	prop('priemLogout'),
);

export const priemLogoutSaga = sagaEffects.rest(priemLogoutTransactionActions, priemLogoutRest);
