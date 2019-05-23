import { createLoginActions, createTransactionReducer } from '$common';
import { ITransactionState } from '$store';

const createLoginReducer = createTransactionReducer(createLoginActions);

export const createLoginSelector = (state: ITransactionState) => {
	const { loading, error, result } = state.createLogin;

	return { loading, error, result };
};

export default createLoginReducer;
