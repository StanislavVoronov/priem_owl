import {
	createSelector,
	createTransactionReducer,
	createTransactionActions,
	sagaEffects,
} from '@black_bird/utils';
import { updateLoginRest } from '$rests';
import { transactionSelector } from './selectors';
import { AUTO_REQUEST_RETRY, TRANSACTION_NAMES } from '$common';

export const updateLoginTrnActions = createTransactionActions(
	TRANSACTION_NAMES.UPDATE_LOGIN,
	(login: string) => login,
);

export const updateLoginTrnReducer = createTransactionReducer(updateLoginTrnActions);

export const updateLoginTransactionSelector = createSelector(
	transactionSelector,
	(state) => state.updatePhones,
);

export const updateLoginSaga = sagaEffects.rest(
	updateLoginTrnActions,
	({ payload }) => updateLoginRest(payload),
	{
		autoRetry: AUTO_REQUEST_RETRY,
	},
);
