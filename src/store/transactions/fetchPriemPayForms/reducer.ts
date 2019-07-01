import { createTransactionReducer, fetchPriemPayFormsActions } from '$common';
import { ITransactionState } from '$store';

const fetchPriemPayFormsReducer = createTransactionReducer(fetchPriemPayFormsActions);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.fetchPriemPayForms;

	return { loading, error, result };
};

export default fetchPriemPayFormsReducer;
