import { createPersonTransactionActions, createTransactionReducer } from '$common';
import { ITransactionsState } from '../index';

const createPersonReducer = createTransactionReducer(createPersonTransactionActions);

export const transaction = (state: ITransactionsState) => {
	const { isFetching, exception, result } = state.createPerson;
	console.log('createPerson', result);
	const npId = result.length > 0 ? result[0].npId : 0;

	return { isFetching, exception, result: npId };
};

export default createPersonReducer;
