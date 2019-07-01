import { combineReducers } from 'redux';
import checkLoginReducer, * as fromCheckLogin from './checkLogin';
import createLoginReducer, * as fromCreateLogin from './createLogin';
import findPersonReducer, * as fromFindPerson from './findPerson';
import createVerificationCodeReducer, * as fromCreateVerificationCode from './createVerificationCode';
import updatePhone, * as fromUpdatePhone from './updatePhone';
import createPersonReducer, * as fromCreatePerson from './createPerson';
import updateAddressReducer, * as fromUpdateAddress from './updateAddress';
import { IRootState } from '$store';
import { createSelector } from 'reselect';
import uploadDocumentsReducer, * as fromUploadDocuments from './uploadDocument';
import fetchPriemFilialsReducer, * as fromFetchPriemFilials from './fetchPriemFilials';
import fetchPriemInstitutesReducer, * as fromFetchPriemInstitutes from './fetchPriemInstitutes';
import fetchPriemEducationLevelsReducer, * as fromFetchPriemEducationLevels from './fetchPriemEducationLevels';
import fetchPriemDirectionsReducer, * as fromFetchPriemDirections from './fetchPriemDirections';
import fetchPriemPayFormsReducer, * as fromFetchPriemPayForms from './fetchPriemPayForms';
import fetchPriemEducationFormsReducer, * as fromFetchPriemEducationForms from './fetchPriemEducationForms';
import fetchPriemProfilesReducer, * as fromFetchPriemProfiles from './fetchPriemProfiles';
import createPriemApplicationsReducer, * as fromCreatePriemApplication from './createPriemApplication';
export const transactionSelector = (state: IRootState) => {
	return state.transactions;
};

export const isUniqueLogin = createSelector(
	transactionSelector,
	fromCheckLogin.isUniqueLogin,
);

export const createLogin = createSelector(
	transactionSelector,
	fromCreateLogin.transaction,
);

export const findPerson = createSelector(
	transactionSelector,
	fromFindPerson.isPersonFound,
);

export const createVerificationCode = createSelector(
	transactionSelector,
	fromCreateVerificationCode.transaction,
);

export const updatePhoneSelector = createSelector(
	transactionSelector,
	fromUpdatePhone.transaction,
);

export const createPerson = createSelector(
	transactionSelector,
	fromCreatePerson.transaction,
);

export const uploadDocuments = createSelector(
	transactionSelector,
	fromUploadDocuments.transactionList,
);

export const createPriemApplications = createSelector(
	transactionSelector,
	fromCreatePriemApplication.listByKey,
);

export const fetchPriemFilials = createSelector(
	transactionSelector,
	fromFetchPriemFilials.transaction,
);

export const fetchPriemInstitutes = createSelector(
	transactionSelector,
	fromFetchPriemInstitutes.transaction,
);

export const fetchPriemEducationLevels = createSelector(
	transactionSelector,
	fromFetchPriemEducationLevels.transaction,
);

export const fetchPriemDirections = createSelector(
	transactionSelector,
	fromFetchPriemDirections.transaction,
);

export const fetchPriemProfiles = createSelector(
	transactionSelector,
	fromFetchPriemProfiles.transaction,
);

export const fetchPriemEducationForms = createSelector(
	transactionSelector,
	fromFetchPriemEducationForms.transaction,
);

export const fetchPriemPayForms = createSelector(
	transactionSelector,
	fromFetchPriemPayForms.transaction,
);
const transactions = combineReducers({
	checkLogin: checkLoginReducer,
	createLogin: createLoginReducer,
	findPerson: findPersonReducer,
	createVerificationCode: createVerificationCodeReducer,
	uploadDocuments: uploadDocumentsReducer,
	createPerson: createPersonReducer,
	updateAddress: updateAddressReducer,
	updatePhone,
	fetchPriemFilials: fetchPriemFilialsReducer,
	fetchPriemInstitutes: fetchPriemInstitutesReducer,
	fetchPriemEducationLevels: fetchPriemEducationLevelsReducer,
	fetchPriemDirections: fetchPriemDirectionsReducer,
	fetchPriemProfiles: fetchPriemProfilesReducer,
	fetchPriemPayForms: fetchPriemPayFormsReducer,
	fetchPriemEducationForms: fetchPriemEducationFormsReducer,
	createPriemApplications: createPriemApplicationsReducer,
});

export default transactions;
