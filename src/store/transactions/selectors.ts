import { IRootState } from '$store';

export const transactionSelector = (state: IRootState) => {
	return state.transactions;
};
