import { createTransactionReducer, updatePhoneActionsByKey } from '$common';
import { ITransactionState } from '$store';

const updatePhoneReducer = createTransactionReducer(updatePhoneActionsByKey);

export const updatePhoneSelector = (state: ITransactionState) => {
	const { loading, error, result } = state.findPerson;

	return { loading, error, result };
};

export default updatePhoneReducer;
