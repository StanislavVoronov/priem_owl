import { combineReducers } from 'redux';
import checkLogin, * as fromCheckLogin from './checkLogin';
import createLogin, * as fromCreateLogin from './createLogin';
import findPerson, * as fromFindPerson from './findPerson';
import createVerificationCode, * as fromCreateVerificationCode from './createVerificationCode';
import updatePhone, * as fromUpdatePhone from './updatePhone';
import createPerson, * as fromCreatePerson from './createPerson';
import updateAddress, * as fromUpdateAddress from './updateAddress';
import { IRootState } from '$store';
import { createSelector } from 'reselect';
import uploadDocuments, * as fromUploadDocuments from './uploadDocument';

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

export const updatePhoneSelector = createSelector(
	transactionSelector,
	fromUpdatePhone.updatePhoneSelector,
);

export const createPersonSelector = createSelector(
	transactionSelector,
	fromCreatePerson.createPersonSelector,
);

export const uploadDocumentsSelector = createSelector(
	transactionSelector,
	fromUploadDocuments.uploadDocumentsFormSelector,
);

const transactions = combineReducers({
	checkLogin,
	createLogin,
	findPerson,
	createVerificationCode,
	uploadDocuments,
	createPerson,
	updateAddress,
	updatePhone,
});

export default transactions;
