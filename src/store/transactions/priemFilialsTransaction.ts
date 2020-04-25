import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { priemFilialsRest } from '$rests';
import { TRANSACTION_NAMES } from '$actions';
import { disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';

export const priemFilialsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemFilials,
);

export const priemFilialsReducer = createTransactionReducer(priemFilialsTransactionActions);

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
	true,
);
