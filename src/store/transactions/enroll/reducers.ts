import { handleActions } from 'redux-actions';
import { checkPayload, createTransactionActions, initialTransactionState, ITransaction } from '$common';
import { IEnrollTransactionState, IRootState } from '$store';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { ICheckLoginResponse } from './models';

export const enrollTransactionActions = createTransactionActions<ICheckLoginResponse>('enrollCheckLogin');
const checkLoginReducer = handleActions<ITransaction<ICheckLoginResponse>, any>(
	{
		[enrollTransactionActions.request.toString()]: (state, action) => ({
			...state,
			loading: true,
		}),
		[enrollTransactionActions.success.toString()]: (state, action) => {
			return checkPayload(action, (result: ICheckLoginResponse[]) => {
				return { ...state, loading: false, result };
			});
		},
		[enrollTransactionActions.failure.toString()]: (state, action) => ({
			...state,
			loading: false,
			error: action.payload!.error,
		}),
	},
	initialTransactionState,
);
const enroll = combineReducers({ checkLogin: checkLoginReducer });
const enrollTransactionSelector = (state: IRootState) => {
	return state.transactions.enroll;
};
export const checkLoginSelector = createSelector(
	enrollTransactionSelector,
	(state: IEnrollTransactionState) => {
		const { loading, error, result } = state.checkLogin;

		return { loading, error, result: result[0] };
	},
);

export default enroll;
