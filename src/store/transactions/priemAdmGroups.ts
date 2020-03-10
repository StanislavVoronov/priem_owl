import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { createSelector, prop } from '@black_bird/utils';
import { IAdmDictionaryItem } from '$common';
import { ITransactionsState } from './transactionsModels';
import { fetchPriemGroups } from '$rests';

export const priemAdmGroupsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemGroups,
	(
		filial: IAdmDictionaryItem,
		inst: IAdmDictionaryItem,
		direction: IAdmDictionaryItem,
		educForm: IAdmDictionaryItem,
		payForm: IAdmDictionaryItem,
		key: string,
	) => ({
		key,
		filial,
		inst,
		direction,
		educForm,
		payForm,
	}),
);

export const priemAdmGroupsReducer = createTransactionReducer(priemAdmGroupsTransactionActions, {
	mapToKey: payload => payload.key,
});

export const priemAdmGroupsTransactionSelector = createSelector(
	prop('transactions'),
	(_: any, id: string) => id,
	(state: ITransactionsState, id) => state.priemAdmGroups[id],
);

export const priemAdmGroupsSaga = sagaEffects.rest(priemAdmGroupsTransactionActions, ({ payload }) => {
	return fetchPriemGroups(
		payload.filial.ID,
		payload.inst.ID,
		payload.direction.ID,
		payload.educForm.ID,
		payload.payForm.ID,
	);
});
