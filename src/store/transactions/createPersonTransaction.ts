import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector, prop } from '@black_bird/utils';
import { AUTO_REQUEST_RETRY, TRANSACTION_NAMES } from '$common';
import { createPersonRest, ICreatePersonPayload } from '$rests';
import { transactionSelector } from './selectors';

export const createPersonTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreatePerson,
	(payload: ICreatePersonPayload) => payload,
);
export const createPersonReducer = createTransactionReducer(createPersonTransactionActions);

export const createPersonTransactionSelector = createSelector(
	transactionSelector,
	prop('createPerson'),
);

export const createPersonSaga = sagaEffects.rest(createPersonTransactionActions, ({ payload }) =>
	createPersonRest(payload),
);
