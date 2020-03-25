import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { priemInstRest } from '$rests';
import { disabledPayFormSelector } from '../selectors';

export const priemInstitutesTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemInstitutes,
	(filial: IAdmDictionaryItem, eduLevel: IAdmDictionaryItem) => ({ filial, eduLevel }),
);

export const priemInstitutesReducer = createTransactionReducer(priemInstitutesTransactionActions);

export const priemInstitutesTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemInstitutes,
);

export const priemInstsSaga = sagaEffects.rest(
	priemInstitutesTransactionActions,
	function*({ payload }) {
		const payForms = yield sagaEffects.select(disabledPayFormSelector);

		return priemInstRest(payload.filial.ID, payload.eduLevel.ID, payForms);
	},
	true,
);
