import { createTransactionReducer, updatePhoneActionsByKey } from '$common';
import { ITransactionState } from '$store';

const updatePhoneReducer = createTransactionReducer(updatePhoneActionsByKey);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.findPerson;

	return { loading, error, result };
};

export default updatePhoneReducer;
