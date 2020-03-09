import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { fetchPriemEducForms } from '$rests';

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

export const priemEducFormsReducer = createTransactionReducer(priemEducFormsTransactionActions);

export const priemEducFormsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemEducForms,
);

export const educFormsSaga = sagaEffects.rest(priemEducFormsTransactionActions, ({ payload }) => {
		return fetchPriemEducForms(payload.filial.ID, payload.inst.ID, payload.direction.ID);
	})
