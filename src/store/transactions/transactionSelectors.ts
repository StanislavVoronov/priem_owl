import { IRootState } from '$store';
import { createSelector } from 'reselect';
import * as fromCheckLogin from './checkLogin';
import * as fromCreateLogin from './createLogin';
import * as fromFindPerson from './findPerson';
import * as fromCreateVerificationCode from './createVerificationCode';
import * as fromUpdatePhone from './updatePhone';
import * as fromCreatePerson from './createPerson';
import * as fromUploadDocuments from './uploadDocument';
import * as fromCreateApplication from './createPriemApplication';
import * as fromFetchFilials from './fetchPriemFilials';
import * as fromFetchInstitutes from './fetchPriemInstitutes';
import * as fromFetchEducationLevels from './fetchPriemEducationLevels';
import * as fromFetchDirections from './fetchPriemDirections';
import * as fromFetchProfiles from './fetchPriemProfiles';
import * as fromFetchEducForms from './fetchPriemEducationForms';
import * as fromFetchPayForms from './fetchPriemPayForms';
import * as fromFetchAdmGroups from './fetchPriemGroups';

export const transactionSelector = (state: IRootState) => {
	return state.transactions;
};

export const isUniqueLogin = createSelector(transactionSelector, fromCheckLogin.isUniqueLogin);

export const createLogin = createSelector(transactionSelector, fromCreateLogin.transaction);

export const findPerson = createSelector(transactionSelector, fromFindPerson.isPersonFound);

export const createVerificationCode = createSelector(transactionSelector, fromCreateVerificationCode.transaction);

export const updatePhoneSelector = createSelector(transactionSelector, fromUpdatePhone.transaction);

export const createPerson = createSelector(transactionSelector, fromCreatePerson.transaction);

export const uploadDocuments = createSelector(transactionSelector, fromUploadDocuments.transactionList);

export const createPriemApplications = createSelector(transactionSelector, fromCreateApplication.transactionList);

export const fetchPriemFilials = createSelector(transactionSelector, fromFetchFilials.transaction);

export const fetchPriemInstitutes = createSelector(transactionSelector, fromFetchInstitutes.transaction);

export const fetchPriemEducationLevels = createSelector(transactionSelector, fromFetchEducationLevels.transaction);

export const fetchPriemDirections = createSelector(transactionSelector, fromFetchDirections.transaction);

export const fetchPriemProfiles = createSelector(transactionSelector, fromFetchProfiles.transaction);

export const fetchPriemEducationForms = createSelector(transactionSelector, fromFetchEducForms.transaction);

export const fetchPriemPayForms = createSelector(transactionSelector, fromFetchPayForms.transaction);

export const fetchPriemGroups = createSelector(transactionSelector, fromFetchAdmGroups.transaction);
