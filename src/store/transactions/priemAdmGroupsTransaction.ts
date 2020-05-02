import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector } from '@black_bird/utils';
import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
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
		admGroup: string,
	) => ({
		admGroup,
		filial,
		inst,
		direction,
		educForm,
		payForm,
	}),
);

export const priemAdmGroupsReducer = createTransactionReducer(priemAdmGroupsTransactionActions, {
	mapToKey: (payload) => payload.admGroup,
});

export const priemAdmGroupsTransactionSelector = createSelector(
	transactionSelector,
	(_: any, id: string) => id,
	(state, id) => state.priemAdmGroups[id],
);

export const priemAdmGroupsSaga = sagaEffects.rest(priemAdmGroupsTransactionActions, (payload) =>
	priemAdmGroupsRest(
		payload.filial.ID,
		payload.inst.ID,
		payload.direction.ID,
		payload.educForm.ID,
		payload.payForm.ID,
	),
);
