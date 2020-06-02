import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector } from '@black_bird/utils';
import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import { IAdmGroupResponse, priemAdmGroupsRest } from '$rests';
import { transactionSelector } from './selectors';

export const priemAdmGroupsTransactionActions = createTransactionActions<
	IAdmGroupResponse,
	{
		filial: IAdmDictionaryItem;
		inst: IAdmDictionaryItem;
		direction: IAdmDictionaryItem;
		educForm: IAdmDictionaryItem;
		payForm: IAdmDictionaryItem;
		admType: IAdmDictionaryItem;
		admGroup: string;
	}
>(TRANSACTION_NAMES.FetchPriemGroups);

export const priemAdmGroupsReducer = createTransactionReducer(priemAdmGroupsTransactionActions, {
	mapToKey: (payload) => payload.admGroup,
});

export const priemAdmGroupTransactionSelector = createSelector(
	transactionSelector,
	(_: any, id: string) => id,
	(state, id) => state.priemAdmGroups[id],
);

export const priemAdmGroupsTrnSelector = createSelector(
	transactionSelector,
	(state) => state.priemAdmGroups,
);

export const priemAdmGroupsSaga = sagaEffects.transaction(
	priemAdmGroupsTransactionActions,
	(payload) =>
		priemAdmGroupsRest({
			filial: payload.filial.ID,
			inst: payload.inst.ID,
			dir: payload.direction.ID,
			eduForm: payload.educForm.ID,
			payForm: payload.payForm.ID,
			admType: payload.admType.ID,
		}),
);
