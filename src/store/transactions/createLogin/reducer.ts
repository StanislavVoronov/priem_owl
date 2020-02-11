import { createLoginActions, createTransactionReducer } from '$common';
import { ITransactionState } from '$store';

const createLoginReducer = createTransactionReducer(createLoginActions);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.createLogin;
	const npId = result.length > 0 ? result[0].id : 0;

	return { loading, error, result: npId };
};

export default createLoginReducer;
