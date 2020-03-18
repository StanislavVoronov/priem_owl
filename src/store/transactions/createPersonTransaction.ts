import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector, prop } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { ITransactionsState } from './transactionsModels';
import { createPersonRest, ICreatePersonPayload } from '$rests';

export const createPersonTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreatePerson,
	(payload: ICreatePersonPayload) => payload,
);
export const createPersonReducer = createTransactionReducer(createPersonTransactionActions);

export const createPersonTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.createPerson,
);

export const createPersonSaga = sagaEffects.rest(createPersonTransactionActions, ({ payload }) =>
	createPersonRest(payload),
);
