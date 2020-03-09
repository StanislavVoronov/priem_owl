import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { fetchPriemFilials } from '$rests';

export const priemFilialsTransactionActions = createTransactionActions('PRIEM_FILIALS');

export const priemFilialsReducer = createTransactionReducer(priemFilialsTransactionActions);

export const priemFilialsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemFilials,
);

export const priemFilialsSaga = sagaEffects.rest(priemFilialsTransactionActions, () => fetchPriemFilials());
