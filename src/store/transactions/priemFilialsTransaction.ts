import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { priemFilialsRest } from '$rests';
import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import { disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';
import { submitApplicationFormAction } from '../applicationsForm';

export const priemFilialsTrnActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemFilials);

export const priemFilialsReducer = createTransactionReducer<IAdmDictionaryItem[]>(
	priemFilialsTrnActions,
	{
		cleanActions: [submitApplicationFormAction],
	},
);

export const priemFilialsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemFilials'),
);

export const priemFilialsSaga = sagaEffects.transaction(priemFilialsTrnActions, function* () {
	const payForms = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemFilialsRest(payForms);
});
