import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { fetchPriemEducLevels } from '$rests';

export const priemEducLevelsTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemEducationLevels,
	(filial: IAdmDictionaryItem) => ({ filial }),
);

export const priemEducLevelsReducer = createTransactionReducer(priemEducLevelsTransactionActions);

export const priemEducLevelsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemEducLevels,
);


export const priemEducLevelSaga = 	sagaEffects.rest(priemEducLevelsTransactionActions, ({ payload }) => {
	return fetchPriemEducLevels(payload.filial.ID);
})