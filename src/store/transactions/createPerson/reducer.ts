import { createPersonActions, createTransactionReducer } from '$common';
import { ITransactionState } from '$store';

const createPersonReducer = createTransactionReducer(createPersonActions);

export const transaction = (state: ITransactionState) => {
	const { loading, error, result } = state.createPerson;
	console.log('createPerson', result);
	const npId = result.length > 0 ? result[0].npId : 0;

	return { loading, error, result: npId };
};

export default createPersonReducer;
