import { createTransactionReducer, fetchPriemGroups } from '$common';
import { ITransactionState } from '$store';

const fetchPriemGroupsReducer = createTransactionReducer(fetchPriemGroups);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.fetchPriemGroups;

	return { loading, error, result };
};

export default fetchPriemGroupsReducer;
