import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { priemProfilesRest } from '$rests';
import { disabledPayFormSelector } from '../selectors';

export const priemProfilesTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemProfiles,
	(filial: IAdmDictionaryItem, inst: IAdmDictionaryItem, direction: IAdmDictionaryItem) => ({
		filial,
		inst,
		direction,
	}),
);
export const priemProfilesReducer = createTransactionReducer(priemProfilesTransactionActions);

export const priemProfilesTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemProfiles,
);

export const priemProfilesSaga = sagaEffects.rest(
	priemProfilesTransactionActions,
	function*({ payload }) {
		const payForms = yield sagaEffects.select(disabledPayFormSelector);

		return yield priemProfilesRest(payload.filial.ID, payload.inst.ID, payload.direction.ID, payForms);
	},
	true,
);
