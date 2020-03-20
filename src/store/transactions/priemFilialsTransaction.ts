import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { priemFilialsRest } from '$rests';
import { TRANSACTION_NAMES } from '$actions';

export const priemFilialsTransactionActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemFilials);

export const priemFilialsReducer = createTransactionReducer(priemFilialsTransactionActions);

export const priemFilialsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemFilials,
);

export const priemFilialsSaga = sagaEffects.rest(priemFilialsTransactionActions, () => priemFilialsRest());
