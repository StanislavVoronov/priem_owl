import { createTransactionActions } from '@black_bird/utils';

export const checkLoginTransactionActions = createTransactionActions(
	'CREATE_LOGIN_TRANSACTION',
	(login: string) => login,
);
