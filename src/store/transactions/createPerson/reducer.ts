import { createPersonActions, createTransactionReducer } from '$common';
import { ITransactionState } from '$store';

const createPersonReducer = createTransactionReducer(createPersonActions);

export const createPersonSelector = (state: ITransactionState) => {
	const { loading, error, result } = state.createPerson;
	const npId = result.length > 0 ? result[0].np_uid : 0;

	return { loading, error, result: npId };
};

export default createPersonReducer;
