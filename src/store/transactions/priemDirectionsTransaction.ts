import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import { ITransactionsState } from './transactionsModels';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { priemDirectionRest } from '$rests';
import { disabledPayFormSelector } from '../selectors';

export const priemDirectionsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemDirections,
	(filial: IAdmDictionaryItem, educLevel: IAdmDictionaryItem, inst: IAdmDictionaryItem) => ({
		filial,
		inst,
		educLevel,
	}),
);

export const priemDirectionsReducer = createTransactionReducer(priemDirectionsTransactionActions);

export const priemDirectionsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemDirections,
);

export const priemDirectionSaga = sagaEffects.rest(
	priemDirectionsTransactionActions,
	function*({ payload }) {
		const payForms = yield sagaEffects.select(disabledPayFormSelector);

		return yield priemDirectionRest(payload.filial.ID, payload.educLevel.ID, payload.inst.ID, payForms);
	},
	true,
);
