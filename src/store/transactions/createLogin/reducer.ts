import { createTransactionReducer } from '@black_bird/utils';
import { createLoginTransactionActions } from './actions';
import { ITransactionState } from '../transactionModels';

export const createLoginReducer = createTransactionReducer(createLoginTransactionActions);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.createLogin;
	const npId = result.length > 0 ? result[0].id : 0;

	return { loading, error, result: npId };
};
