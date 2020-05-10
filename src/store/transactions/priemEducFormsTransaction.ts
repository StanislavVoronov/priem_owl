import { IAdmDictionaryItem, IDictionary, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { priemEducFormsRest } from '$rests';
import { applicationAmdTypeSelector, disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';
import { priemProfilesTransactionActions } from './priemProfilesTransaction';

export const priemEducFormsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemEducationForms,
	(filial: IAdmDictionaryItem, inst: IAdmDictionaryItem, direction: IAdmDictionaryItem) => ({
		filial,
		inst,
		direction,
	}),
);

export const priemEducFormsReducer = createTransactionReducer<IAdmDictionaryItem[]>(
	priemEducFormsTransactionActions,
	{
		cleanActions: [priemProfilesTransactionActions.trigger],
	},
);

export const priemEducFormsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemEducForms'),
);

export const educFormsSaga = sagaEffects.transaction(priemEducFormsTransactionActions, function* (
	payload,
) {
	const noPayForms: number[] = yield sagaEffects.select(disabledPayFormSelector);
	const admType: IAdmDictionaryItem = yield sagaEffects.select(applicationAmdTypeSelector);

	return yield priemEducFormsRest({
		filial: payload.filial.ID,
		inst: payload.inst.ID,
		dir: payload.direction.ID,
		noPayForms,
		admType: admType.ID,
	});
});
