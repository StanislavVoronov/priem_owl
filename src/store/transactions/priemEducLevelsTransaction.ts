import { AUTO_REQUEST_RETRY, IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { priemEducLevelsRest } from '$rests';
import { disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';

export const priemEducLevelsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemEducationLevels,
	(filial: IAdmDictionaryItem) => ({ filial }),
);

export const priemEducLevelsReducer = createTransactionReducer(priemEducLevelsTransactionActions, {
	cleanActions: [priemEducLevelsTransactionActions.trigger],
});

export const priemEducLevelsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemEducLevels'),
);

export const priemEducLevelSaga = sagaEffects.rest(
	priemEducLevelsTransactionActions,
	function* ({ payload }) {
		const payForms = yield sagaEffects.select(disabledPayFormSelector);

		return yield priemEducLevelsRest(payload.filial.ID, payForms);
	},
	{ autoRetry: AUTO_REQUEST_RETRY },
);
