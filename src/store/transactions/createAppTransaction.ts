import {
	createTransactionReducer,
	createTransactionActions,
	createSelector,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { createApplicationRest, ICreatePriemApplicationResponse } from '$rests';
import {
	IAdmDictionaryItem,
	TRANSACTION_NAMES,
	APPLICATION_FLOW,
	IAdmGroupItem,
	AUTO_RETRY_REQUEST,
} from '$common';
import { transactionSelector } from './selectors';

export const createAppTransactionActions = createTransactionActions<
	ICreatePriemApplicationResponse,
	{ flow: number; adm: IAdmGroupItem; prof: IAdmDictionaryItem; priority: number; app: string }
>(TRANSACTION_NAMES.CreateApplication);

export const createApplicationReducer = createTransactionReducer(createAppTransactionActions, {
	mapToKey: (payload) => payload.app,
});

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
	(payload) =>
		createApplicationRest(payload.adm.ID, payload.prof.ID, payload.priority, payload.flow),
	AUTO_RETRY_REQUEST,
);
