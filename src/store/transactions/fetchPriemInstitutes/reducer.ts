import { createTransactionReducer, fetchPriemInstitutesActions } from '$common';
import { ITransactionState } from '$store';

const fetchPriemInstitutesReducer = createTransactionReducer(fetchPriemInstitutesActions);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.fetchPriemInstitutes;

	return { loading, error, result };
};

export default fetchPriemInstitutesReducer;
