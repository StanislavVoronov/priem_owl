import { createTransactionReducer, createVerificationCodeActions } from '$common';
import { ITransactionState } from '$store';

const createVerificationCodeReducer = createTransactionReducer(createVerificationCodeActions);

export const createVerificationCodeSelector = (state: ITransactionState) => {
	const { loading, error, result } = state.createLogin;
	const npId = result.length > 0 ? result[0].id : 0;

	return { loading, error, result: npId };
};

export default createVerificationCodeReducer;
