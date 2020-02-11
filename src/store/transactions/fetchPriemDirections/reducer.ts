import { createTransactionReducer, fetchPriemDirectionsActions } from '$common';
import { ITransactionState } from '$store';

const fetchPriemDirectionsReducer = createTransactionReducer(fetchPriemDirectionsActions);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.fetchPriemDirections;

	return { loading, error, result };
};

export default fetchPriemDirectionsReducer;
