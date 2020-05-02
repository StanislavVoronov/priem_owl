import { IAdmDictionaryItem, IDictionary, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { priemEducFormsRest } from '$rests';
import { applicationAmdTypeSelector, disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';
import { priemProfilesTransactionActions } from './priemProfilesTransaction';

export const priemEducFormsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemEducationForms,
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

export const priemEducFormsReducer = createTransactionReducer(priemEducFormsTransactionActions, {
	cleanActions: [priemProfilesTransactionActions.trigger],
});

export const priemEducFormsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemEducForms'),
);

export const educFormsSaga = sagaEffects.rest(priemEducFormsTransactionActions, function* (
	payload,
) {
	const noPayForms: number[] = yield sagaEffects.select(disabledPayFormSelector);
	const admType: IDictionary = yield sagaEffects.select(applicationAmdTypeSelector);

	return yield priemEducFormsRest({
		filial: payload.filial.ID,
		inst: payload.inst.ID,
		dir: payload.direction.ID,
		noPayForms,
		admType: admType.id,
	});
});
