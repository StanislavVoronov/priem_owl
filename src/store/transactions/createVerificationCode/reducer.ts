import { createTransactionReducer, createVerificationCodeActions } from '$common';
import { ITransactionState } from '$store';

const createVerificationCodeReducer = createTransactionReducer(createVerificationCodeActions);

export const createVerificationCodeSelector = (state: ITransactionState) => {
	const { loading, error, result } = state.createVerificationCode;

	return { loading, error, result };
};

export default createVerificationCodeReducer;
