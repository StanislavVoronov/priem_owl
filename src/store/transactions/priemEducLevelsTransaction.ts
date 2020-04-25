import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { priemEducLevelsRest } from '$rests';
import { disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';

export const priemEducLevelsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemEducationLevels,
	(filial: IAdmDictionaryItem) => ({ filial }),
);

export const priemEducLevelsReducer = createTransactionReducer(priemEducLevelsTransactionActions);

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
	true,
);
