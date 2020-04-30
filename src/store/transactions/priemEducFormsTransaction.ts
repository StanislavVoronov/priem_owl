import { AUTO_REQUEST_RETRY, IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { priemEducFormsRest } from '$rests';
import { disabledPayFormSelector } from '../selectors';
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

export const educFormsSaga = sagaEffects.rest(priemEducFormsTransactionActions, function* ({
	payload,
}) {
	const payForms = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemEducFormsRest(
		payload.filial.ID,
		payload.inst.ID,
		payload.direction.ID,
		payForms,
	);
});
