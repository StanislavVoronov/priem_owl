import { createTransactionReducer } from '@black_bird/utils';
import { ITransactionState } from '$store';
import { checkLoginTransactionActions } from './actions';

const checkLoginReducer = createTransactionReducer(checkLoginTransactionActions);

export const isUniqueLogin = (state: ITransactionState) => {
	const { loading, error, result } = state.checkLogin;

	return { loading, error, result: result.length ? result[0].COUNT === 0 : false };
};

export default checkLoginReducer;
