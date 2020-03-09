import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { createSelector, prop } from '@black_bird/utils';
import { IAdmDictionaryItem } from '$common';
import { ITransactionsState } from './transactionsModels';
import { fetchPriemGroups } from '$rests';

export interface IAdmGroup {
	filial: IAdmDictionaryItem;
	inst: IAdmDictionaryItem;
	direction: IAdmDictionaryItem;
	profiles: IAdmDictionaryItem[];
	educForms: IAdmDictionaryItem;
	payForms: IAdmDictionaryItem[];
}

export const priemAdmGroupsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemGroups,
	(
		filial: IAdmDictionaryItem,
		inst: IAdmDictionaryItem,
		direction: IAdmDictionaryItem,
		educForms: IAdmDictionaryItem[],
		payForms: IAdmDictionaryItem[],
		key: string,
	) => ({
		key,
		filial,
		inst,
		direction,
		educForms,
		payForms,
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
		payload.educForms.map(prop('ID')),
		payload.payForms.map(prop('ID')),
	);
});
