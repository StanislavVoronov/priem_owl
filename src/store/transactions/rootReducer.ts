import { combineReducers } from 'redux';
import checkLogin, * as fromCheckLogin from './checkLogin';
import createLogin, * as fromCreateLogin from './createLogin';
import findPerson, * as fromFindPerson from './findPerson';
import { IRootState } from '$store';
import { createSelector } from 'reselect';

export const transactionSelector = (state: IRootState) => {
	return state.transactions;
};

export const isUniqueLoginSelector = createSelector(
	transactionSelector,
	fromCheckLogin.isUniqueLoginSelector,
);

export const createLoginSelector = createSelector(
	transactionSelector,
	fromCreateLogin.createLoginSelector,
);

export const findPersonSelector = createSelector(
	transactionSelector,
	fromFindPerson.isPersonFound,
);

const transactions = combineReducers({ checkLogin, createLogin, findPerson });

export default transactions;
