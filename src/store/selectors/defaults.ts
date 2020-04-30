import { TransactionStatus } from '@black_bird/utils';

export const DEFAULT_TRANSACTION = {
	result: [],
	isFetching: true,
	error: null,
	status: TransactionStatus.INITIAL,
};
