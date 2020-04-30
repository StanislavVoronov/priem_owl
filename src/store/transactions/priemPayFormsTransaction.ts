import { AUTO_REQUEST_RETRY, IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { priemPayFormsRest } from '$rests';
import { disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';

export const priemPayFormsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemPayForms,
	(
		filial: IAdmDictionaryItem,
		inst: IAdmDictionaryItem,
		direction: IAdmDictionaryItem,
		educForms: IAdmDictionaryItem[],
	) => ({
		filial,
		inst,
		direction,
		educForms,
	}),
);

export const priemPayFormsReducer = createTransactionReducer(priemPayFormsTransactionActions, {
	cleanActions: [priemPayFormsTransactionActions.trigger],
});

export const priemPayFormsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemPayForms'),
);

export const payFormsSaga = sagaEffects.rest(
	priemPayFormsTransactionActions,
	function* ({ payload }) {
		const payForms = yield sagaEffects.select(disabledPayFormSelector);

		return yield priemPayFormsRest(
			payload.filial.ID,
			payload.inst.ID,
			payload.direction.ID,
			payload.educForms.map((item) => item.ID),
			payForms,
		);
	},
	{ autoRetry: AUTO_REQUEST_RETRY },
);
