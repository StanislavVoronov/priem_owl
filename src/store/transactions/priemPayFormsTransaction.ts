import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import { ITransactionsState } from './transactionsModels';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { fetchPriemPayForms } from '$rests';

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

export const priemPayFormsReducer = createTransactionReducer(priemPayFormsTransactionActions);

export const priemPayFormsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemPayForms,
);

export const payFormsSaga = sagaEffects.rest(priemPayFormsTransactionActions, ({ payload }) => {
		return fetchPriemPayForms(
			payload.filial.ID,
			payload.inst.ID,
			payload.direction.ID,
			payload.educForms.map(item => item.ID),
		);
	})
