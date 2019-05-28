import { combineReducers } from 'redux';
import checkLogin, * as fromCheckLogin from './checkLogin';
import createLogin, * as fromCreateLogin from './createLogin';
import findPerson, * as fromFindPerson from './findPerson';
import createVerificationCode, * as fromCreateVerificationCode from './createVerificationCode';
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

export const createVerificationCodeSelector = createSelector(
	transactionSelector,
	fromCreateVerificationCode.createVerificationCodeSelector,
);

const transactions = combineReducers({ checkLogin, createLogin, findPerson, createVerificationCode });

export default transactions;
