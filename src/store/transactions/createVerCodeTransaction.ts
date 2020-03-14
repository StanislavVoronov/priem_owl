import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector, prop } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { ITransactionsState } from './transactionsModels';
import { VerificationMethod } from '$common';
import { createVerCodeRest } from '$rests';

export const createVerCodeTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreateVerificationCode,
	(email: string, phone: string, method: VerificationMethod) => ({ email, phone, method }),
);
export const createVerCodeReducer = createTransactionReducer(createVerCodeTransactionActions);

export const createVerCodeTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.createVerCode,
);

export const createVerCodeSaga = sagaEffects.rest(createVerCodeTransactionActions, ({ payload }) => {
	return createVerCodeRest(payload.email, payload.phone, payload.method);
});
