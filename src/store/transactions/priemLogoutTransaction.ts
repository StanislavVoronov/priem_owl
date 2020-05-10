import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { priemLogoutRest } from '$rests';
import { TRANSACTION_NAMES } from '$common';
import { transactionSelector } from './selectors';

export const priemLogoutTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.PriemLogout,
);

export const priemLogoutReducer = createTransactionReducer(priemLogoutTransactionActions);

export const priemLogoutTransactionSelector = createSelector(
	transactionSelector,
	prop('priemLogout'),
);

export const priemLogoutSaga = sagaEffects.transaction(
	priemLogoutTransactionActions,
	priemLogoutRest,
);
