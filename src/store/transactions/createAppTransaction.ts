import {
	createTransactionReducer,
	createTransactionActions,
	createSelector,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { ITransactionsState } from './transactionsModels';
import { createApplicationRest, createPersonRest } from '$rests';
import { createPersonTransactionActions } from '$store';
import { IAdmDictionaryItem } from '$common';

export const createAppTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreateApplication,
	(adm: IAdmDictionaryItem, prof: IAdmDictionaryItem, priority: number, key: string) => ({
		adm: adm.ID,
		prof: prof.ID,
		priority,
		key
	}),
);

export const createApplicationReducer = createTransactionReducer(createAppTransactionActions, {
	mapToKey: payload => payload.key,
});

export const createAppsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => {
		return state.createApplications
	},
);

export const createAppTransactionSelector = createSelector(
	prop('transactions'),
	(state: any, id: string) => id,
	(state: ITransactionsState, id: string) => {
		const { isFetching, exception, result } = state.createApplications[id];

		return { isFetching, exception, result };
	},
);

export const createApplicationSaga = sagaEffects.rest(createAppTransactionActions, ({ payload }) =>
	 createApplicationRest(payload.adm, payload.prof, payload.priority)
);