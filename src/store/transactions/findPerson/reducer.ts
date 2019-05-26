import { findPersonActions, createTransactionReducer } from '$common';
import { ITransactionState } from '$store';

const findPersonReducer = createTransactionReducer(findPersonActions);

export const isPersonFound = (state: ITransactionState) => {
	const { loading, error, result } = state.findPerson;

	return { loading, error, result: Array.isArray(result) && result.length > 0 };
};

export default findPersonReducer;
