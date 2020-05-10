import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector } from '@black_bird/utils';
import { VerificationMethod, TRANSACTION_NAMES } from '$common';
import { createVerCodeRest, ICreateVerCodeResponse } from '$rests';
import { transactionSelector } from './selectors';

export const createVerCodeTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreateVerificationCode,
	(email: string, phone: string, method: VerificationMethod) => ({ email, phone, method }),
);
export const createVerCodeReducer = createTransactionReducer<ICreateVerCodeResponse>(
	createVerCodeTransactionActions,
	{
		cleanActions: [createVerCodeTransactionActions.trigger],
	},
);

export const createVerCodeTransactionSelector = createSelector(
	transactionSelector,
	(state) => state.createVerCode,
);

export const createVerCodeSaga = sagaEffects.transaction(
	createVerCodeTransactionActions,
	(payload) => createVerCodeRest(payload.email, payload.phone, payload.method),
);
