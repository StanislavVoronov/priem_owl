import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { priemFilialsRest } from '$rests';
import { AUTO_REQUEST_RETRY, TRANSACTION_NAMES } from '$common';
import { disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';

export const priemFilialsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemFilials,
);

export const priemFilialsReducer = createTransactionReducer(priemFilialsTransactionActions, {
	cleanActions: [priemFilialsTransactionActions.trigger],
});

export const priemFilialsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemFilials'),
);

export const priemFilialsSaga = sagaEffects.rest(
	priemFilialsTransactionActions,
	function* () {
		const payForms = yield sagaEffects.select(disabledPayFormSelector);

		return yield priemFilialsRest(payForms);
	},
	{ autoRetry: AUTO_REQUEST_RETRY },
);
