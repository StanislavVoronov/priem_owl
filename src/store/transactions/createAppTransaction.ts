import {
	createTransactionReducer,
	createTransactionActions,
	createSelector,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { createApplicationRest } from '$rests';
import {
	IAdmDictionaryItem,
	TRANSACTION_NAMES,
	APPLICATION_FLOW,
	IAdmGroupItem,
	AUTO_RETRY_REQUEST,
} from '$common';
import { transactionSelector } from './selectors';

export const createAppTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreateApplication,
	(flow: number, adm: IAdmGroupItem, prof: IAdmDictionaryItem, priority: number, app: string) => ({
		flow,
		adm: adm.ID,
		prof: prof.ID,
		priority,
		app,
	}),
);

export const createApplicationReducer = createTransactionReducer<string, { app: string }>(
	createAppTransactionActions,
	{
		mapToKey: (payload) => payload.app,
	},
);

export const createAppsTransactionSelector = createSelector(
	transactionSelector,
	prop('createApplications'),
);

export const createAppTransactionSelector = createSelector(
	transactionSelector,
	(state: any, id: string) => id,
	(state, id: string) => {
		const { isFetching, exception, result } = state.createApplications[id];

		return { isFetching, exception, result };
	},
);

export const createApplicationSaga = sagaEffects.transaction(
	createAppTransactionActions,
	(payload) => createApplicationRest(payload.adm, payload.prof, payload.priority, payload.flow),
	AUTO_RETRY_REQUEST,
);
