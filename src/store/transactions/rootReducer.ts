import { combineReducers } from 'redux';
import checkLogin, * as fromCheckLogin from './checkLogin';
import createLogin, * as fromCreateLogin from './createLogin';
import { IRootState } from '$store';
import { createSelector } from 'reselect';

export const transactionSelector = (state: IRootState) => {
	return state.transactions;
};

export const checkLoginSelector = createSelector(
	transactionSelector,
	fromCheckLogin.isUniqueLoginSelector,
);

export const createLoginSelector = createSelector(
	transactionSelector,
	fromCreateLogin.createLoginSelector,
);

const transactions = combineReducers({ checkLogin, createLogin });

export default transactions;
