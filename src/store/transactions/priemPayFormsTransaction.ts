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

export const priemPayFormsTransactionActions = createTransactionActions<
	IAdmDictionaryItem[],
	{
		filial: IAdmDictionaryItem;
		inst: IAdmDictionaryItem;
		direction: IAdmDictionaryItem;
		educForms: IAdmDictionaryItem[];
	}
>(TRANSACTION_NAMES.FetchPriemPayForms);

export const priemPayFormsReducer = createTransactionReducer(priemPayFormsTransactionActions, {
	cleanActions: [priemEducFormsTransactionActions.trigger],
});

export const priemPayFormsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemPayForms'),
);

export const payFormsSaga = sagaEffects.transaction(priemPayFormsTransactionActions, function* (
	payload,
) {
	const noPayForms: number[] = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemPayFormsRest({
		filial: payload.filial.ID,
		inst: payload.inst.ID,
		dir: payload.direction.ID,
		educForms: payload.educForms.map((item) => item.ID),
		noPayForms,
	});
});
