import {
	createSelector,
	createTransactionReducer,
	createTransactionActions,
	sagaEffects,
} from '@black_bird/utils';
import { updateLoginRest } from '$rests';
import { transactionSelector } from './selectors';
import { AUTO_RETRY_REQUEST, TRANSACTION_NAMES } from '$common';

export const updateLoginTrnActions = createTransactionActions(
	TRANSACTION_NAMES.UPDATE_LOGIN,
	(login: string) => login,
);

export const updateLoginTrnReducer = createTransactionReducer(updateLoginTrnActions);

export const updateLoginTransactionSelector = createSelector(
	transactionSelector,
	(state) => state.updatePhones,
);

export const updateLoginSaga = sagaEffects.transaction(
	updateLoginTrnActions,
	(payload) => updateLoginRest(payload),
	AUTO_RETRY_REQUEST,
);
