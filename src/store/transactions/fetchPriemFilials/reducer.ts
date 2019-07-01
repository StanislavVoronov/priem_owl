import { createTransactionReducer, fetchPriemFilialsActions } from '$common';
import { ITransactionState } from '$store';

const fetchPriemFilialsReducer = createTransactionReducer(fetchPriemFilialsActions);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.fetchPriemFilials;

	return { loading, error, result };
};

export default fetchPriemFilialsReducer;
