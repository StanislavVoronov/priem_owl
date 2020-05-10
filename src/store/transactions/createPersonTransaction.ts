import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector, prop } from '@black_bird/utils';
import { AUTO_RETRY_REQUEST, ICreatePersonData, TRANSACTION_NAMES } from '$common';
import { createPersonRest, ICreatePersonPayload } from '$rests';
import { transactionSelector } from './selectors';

export const createPersonTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreatePerson,
	(payload: ICreatePersonPayload) => payload,
);
export const createPersonReducer = createTransactionReducer<ICreatePersonData>(
	createPersonTransactionActions,
);

export const createPersonTransactionSelector = createSelector(
	transactionSelector,
	prop('createPerson'),
);

export const createPersonSaga = sagaEffects.transaction(
	createPersonTransactionActions,
	(payload) => createPersonRest(payload),
	AUTO_RETRY_REQUEST,
);
