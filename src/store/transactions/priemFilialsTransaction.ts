import { createSelector, createTransactionActions, createTransactionReducer, prop } from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';

export const priemFilialsTransactionActions = createTransactionActions('PRIEM_FILIALS');

export const priemFilialsReducer = createTransactionReducer(priemFilialsTransactionActions);

export const priemFilialsTransactionSelector = createSelector(prop('transactions'), (state: ITransactionsState) => state.priemFilials);

