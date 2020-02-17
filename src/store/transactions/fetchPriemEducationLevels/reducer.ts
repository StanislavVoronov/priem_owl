import { createTransactionReducer, fetchPriemEducationLevelsActions } from '$common';
import { ITransactionState } from '$store';

const fetchPriemEducationReducer = createTransactionReducer(fetchPriemEducationLevelsActions);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.fetchPriemEducationLevels;

	return { loading, error, result };
};

export default fetchPriemEducationReducer;
