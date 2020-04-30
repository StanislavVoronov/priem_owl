import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
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
import { priemDirectionsTrnActions } from './priemDirectionsTransaction';
import { priemProfilesTransactionActions } from './priemProfilesTransaction';
import { priemEducFormsTransactionActions } from './priemEducFormsTransaction';

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
	cleanActions: [priemEducFormsTransactionActions.trigger],
});

export const priemPayFormsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemPayForms'),
);

export const payFormsSaga = sagaEffects.rest(priemPayFormsTransactionActions, function* ({
	payload,
}) {
	const payForms = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemPayFormsRest(
		payload.filial.ID,
		payload.inst.ID,
		payload.direction.ID,
		payload.educForms.map((item) => item.ID),
		payForms,
	);
});
