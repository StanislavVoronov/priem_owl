import {
	createTransactionReducer,
	createTransactionActions,
	createSelector,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { createApplicationRest } from '$rests';
import { IAdmDictionaryItem, TRANSACTION_NAMES, APPLICATION_FLOW } from '$common';
import { transactionSelector } from './selectors';

export const createAppTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreateApplication,
	(adm: IAdmDictionaryItem, prof: IAdmDictionaryItem, priority: number, app: string) => ({
		adm: adm.ID,
		prof: prof.ID,
		priority,
		app,
	}),
);

export const createApplicationReducer = createTransactionReducer(createAppTransactionActions, {
	mapToKey: (payload) => payload.app,
});

export const createAppsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => {
		return state.createApplications;
	},
);

export const createAppTransactionSelector = createSelector(
	transactionSelector,
	(state: any, id: string) => id,
	(state, id: string) => {
		const { isFetching, exception, result } = state.createApplications[id];

		return { isFetching, exception, result };
	},
);

export const createApplicationSaga = sagaEffects.rest(createAppTransactionActions, ({ payload }) =>
	createApplicationRest(payload.adm, payload.prof, payload.priority, APPLICATION_FLOW),
);
