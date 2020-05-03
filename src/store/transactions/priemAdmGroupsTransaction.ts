import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector } from '@black_bird/utils';
import { IAdmDictionaryItem, IPriemGroup, TRANSACTION_NAMES } from '$common';
import { priemAdmGroupsRest } from '$rests';
import { transactionSelector } from './selectors';

export const priemAdmGroupsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemGroups,
	(
		filial: IAdmDictionaryItem,
		inst: IAdmDictionaryItem,
		direction: IAdmDictionaryItem,
		educForm: IAdmDictionaryItem,
		payForm: IAdmDictionaryItem,
		admType: IAdmDictionaryItem,
		admGroup: string,
	) => ({
		admGroup,
		filial,
		inst,
		direction,
		educForm,
		payForm,
		admType,
	}),
);

export const priemAdmGroupsReducer = createTransactionReducer<IPriemGroup[], { admGroup: string }>(
	priemAdmGroupsTransactionActions,
	{
		mapToKey: (payload) => payload.admGroup,
	},
);

export const priemAdmGroupTransactionSelector = createSelector(
	transactionSelector,
	(_: any, id: string) => id,
	(state, id) => state.priemAdmGroups[id],
);

export const priemAdmGroupsTrnSelector = createSelector(
	transactionSelector,
	(state) => state.priemAdmGroups,
);

export const priemAdmGroupsSaga = sagaEffects.rest(priemAdmGroupsTransactionActions, (payload) =>
	priemAdmGroupsRest({
		filial: payload.filial.ID,
		inst: payload.inst.ID,
		dir: payload.direction.ID,
		educForm: payload.educForm.ID,
		payForm: payload.payForm.ID,
		admType: payload.admType.ID,
	}),
);
