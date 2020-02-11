import { createTransactionReducer, fetchPriemEducationFormsActions } from '$common';
import { ITransactionState } from '$store';

const fetchPriemEducationFormsReducer = createTransactionReducer(fetchPriemEducationFormsActions);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.fetchPriemEducationForms;

	return { loading, error, result };
};

export default fetchPriemEducationFormsReducer;
