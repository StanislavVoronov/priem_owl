import { createTransactionReducer, fetchPriemProfilesActions } from '$common';
import { ITransactionState } from '$store';

const fetchPriemProfilesReducer = createTransactionReducer(fetchPriemProfilesActions);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.fetchPriemProfiles;

	return { loading, error, result };
};

export default fetchPriemProfilesReducer;
