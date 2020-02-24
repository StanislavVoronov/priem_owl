import { createAction, createTransactionActions } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';

export const createLoginTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CreateLogin,
	(login: string, password: string) => ({ login, password }),
);