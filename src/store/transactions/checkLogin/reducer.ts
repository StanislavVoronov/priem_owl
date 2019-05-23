import { checkLoginActions, createTransactionReducer } from '$common';
import { ITransactionState } from '$store';

const checkLoginReducer = createTransactionReducer(checkLoginActions);

export const isUniqueLoginSelector = (state: ITransactionState) => {
	const { loading, error, result } = state.checkLogin;

	return { loading, error, result: result.length ? result[0].COUNT === 0 : true };
};

export default checkLoginReducer;
