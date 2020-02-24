import { combineReducers } from 'redux';
import checkLoginReducer from './checkLogin';
import { createLoginReducer } from './createLogin';
import findPersonReducer from './findPerson';
import createVerificationCodeReducer from './createVerificationCode';
import updatePhone from './updatePhone';
import createPersonReducer from './createPerson';
import updateAddressReducer from './updateAddress';
import uploadDocumentsReducer from './uploadDocument';
import fetchPriemFilialsReducer from './fetchPriemFilials';
import fetchPriemInstitutesReducer from './fetchPriemInstitutes';
import fetchPriemEducationLevelsReducer from './fetchPriemEducationLevels';
import fetchPriemDirectionsReducer from './fetchPriemDirections';
import fetchPriemPayFormsReducer from './fetchPriemPayForms';
import fetchPriemEducationFormsReducer from './fetchPriemEducationForms';
import fetchPriemProfilesReducer from './fetchPriemProfiles';
import createPriemApplicationsReducer from './createPriemApplication';
import fetchPriemGroupsReducer from './fetchPriemGroups';

const transactions = combineReducers({
	checkLogin: checkLoginReducer,
	createLogin: createLoginReducer,
	findPerson: findPersonReducer,
	// createVerificationCode: createVerificationCodeReducer,
	// uploadDocuments: uploadDocumentsReducer,
	// createPerson: createPersonReducer,
	// updateAddress: updateAddressReducer,
	// updatePhone,
	// fetchPriemFilials: fetchPriemFilialsReducer,
	// fetchPriemInstitutes: fetchPriemInstitutesReducer,
	// fetchPriemEducationLevels: fetchPriemEducationLevelsReducer,
	// fetchPriemDirections: fetchPriemDirectionsReducer,
	// fetchPriemProfiles: fetchPriemProfilesReducer,
	// fetchPriemPayForms: fetchPriemPayFormsReducer,
	// fetchPriemEducationForms: fetchPriemEducationFormsReducer,
	// createPriemApplications: createPriemApplicationsReducer,
	// fetchPriemGroups: fetchPriemGroupsReducer,
});

export default transactions;
