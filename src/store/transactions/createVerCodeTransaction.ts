import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector } from '@black_bird/utils';
import { VerificationMethod, TRANSACTION_NAMES } from '$common';
import { createVerCodeRest, ICreateVerCodeResponse } from '$rests';
import { transactionSelector } from './selectors';
import { verAccountMethodChanged } from '../verAccountForm';

export const createVerCodeTransactionActions = createTransactionActions<
	ICreateVerCodeResponse,
	{ email: string; phone: string; method: VerificationMethod }
>(TRANSACTION_NAMES.CreateVerificationCode);
export const createVerCodeReducer = createTransactionReducer(createVerCodeTransactionActions, {
	cleanActions: [createVerCodeTransactionActions.trigger, verAccountMethodChanged],
});

export const createVerCodeTransactionSelector = createSelector(
	transactionSelector,
	(state) => state.createVerCode,
);

export const createVerCodeSaga = sagaEffects.transaction(
	createVerCodeTransactionActions,
	(payload) => createVerCodeRest(payload.email, payload.phone, payload.method),
);
