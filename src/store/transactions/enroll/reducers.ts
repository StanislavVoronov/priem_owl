import { handleActions } from 'redux-actions';
import {
	checkPayload,
	createTransactionActions,
	IEnrollRegisterStateForm,
	ITransaction,
	IUpdateTextInputAction,
} from '$common';
import {
	changeFirstName,
	IChangeFirstNameAction,
	IEnrollTransactionState,
	IRootState,
	onChangeGender,
	onChangeMiddleName,
	onChangeTextInput,
} from '$store';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { ICheckLoginResponse } from './models';

const initialState = {
	loading: false,
	result: '',
	error: null,
};
export const enrollTransactionActions = createTransactionActions<ICheckLoginResponse[]>('enrollCheckLogin');
const checkLoginReducer = handleActions<ITransaction<string>, any>(
	{
		[enrollTransactionActions.request.toString()]: (state, action) => ({
			...state,
			loading: true,
		}),
		[enrollTransactionActions.success.toString()]: (state, action) => ({
			...state,
			loading: false,
			result: action.payload ? action.payload.result : '',
		}),
		[enrollTransactionActions.failure.toString()]: (state, action) => ({
			...state,
			loading: false,
			error: action.payload!.error,
		}),
	},
	initialState,
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
