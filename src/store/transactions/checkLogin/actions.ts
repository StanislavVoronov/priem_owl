import { createTransactionActions } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';

export const checkLoginTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.CheckLogin,
	(login: string) => ({ login }),
);
