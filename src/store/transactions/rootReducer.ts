import { combineReducers } from 'redux';
import checkLogin from './checkLogin';
import createLogin from './createLogin';
import { IRootState } from '$store';
import { createSelector } from 'reselect';

export const transactionSelector = (state: IRootState) => {
	return state.transactions;
};

export const createLoginSelector = createSelector(
	transactionSelector,
	state => {
		const { loading, error, result } = state.checkLogin;

		return { loading, error, result };
	},
);

export const isUniqueLoginSelector = createSelector(
	transactionSelector,
	state => {
		const { loading, error, result } = state.checkLogin;

		return { loading, error, result: result.length ? result[0].COUNT === 0 : true };
	},
);

const transactions = combineReducers({ checkLogin, createLogin });

export default transactions;
