import { IAdmDictionaryItem, IDictionary, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { priemPayFormsRest } from '$rests';
import { applicationAmdTypeSelector, disabledPayFormSelector } from '../selectors';
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

export const priemPayFormsReducer = createTransactionReducer<IAdmDictionaryItem[]>(
	priemPayFormsTransactionActions,
	{
		cleanActions: [priemEducFormsTransactionActions.trigger],
	},
);

export const priemPayFormsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemPayForms'),
);

export const payFormsSaga = sagaEffects.rest(priemPayFormsTransactionActions, function* (payload) {
	const noPayForms: number[] = yield sagaEffects.select(disabledPayFormSelector);
	const admType: IAdmDictionaryItem = yield sagaEffects.select(applicationAmdTypeSelector);

	return yield priemPayFormsRest({
		filial: payload.filial.ID,
		inst: payload.inst.ID,
		dir: payload.direction.ID,
		educForms: payload.educForms.map((item) => item.ID),
		noPayForms,
		admType: admType.ID,
	});
});
