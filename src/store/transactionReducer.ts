import { combineReducers } from '@black_bird/utils';
import {
	checkLoginReducer,
	priemInstitutesReducer,
	createVerCodeReducer,
	priemEducFormsReducer,
	priemDirectionsReducer,
	priemEducLevelsReducer,
	createLoginReducer,
	findPersonReducer,
	priemFilialsReducer,
	priemPayFormsReducer,
	priemProfilesReducer,
	priemAdmGroupsReducer,
} from './transactions';

const transactionsReducer = combineReducers({
	checkLogin: checkLoginReducer,
	createLogin: createLoginReducer,
	findPerson: findPersonReducer,
	priemFilials: priemFilialsReducer,
	priemEducLevels: priemEducLevelsReducer,
	priemEducForms: priemEducFormsReducer,
	priemDirections: priemDirectionsReducer,
	priemInstitutes: priemInstitutesReducer,
	createVerCode: createVerCodeReducer,
	priemPayForms: priemPayFormsReducer,
	priemProfiles: priemProfilesReducer,
	priemAdmGroups: priemAdmGroupsReducer,
	// createVerificationCode: createVerificationCodeReducer,
	// uploadDocuments: uploadDocumentsReducer,
	// createPerson: createPersonReducer,
	// updateAddress: updateAddressReducer,
	// updatePhone,
	// priemFilials: fetchPriemFilialsReducer,
	// priemInstitutes: fetchPriemInstitutesReducer,
	// priemEducLevels: fetchPriemEducationLevelsReducer,
	// priemDirections: fetchPriemDirectionsReducer,
	// fetchPriemProfiles: fetchPriemProfilesReducer,
	// fetchPriemPayForms: fetchPriemPayFormsReducer,
	// priemEducForms: fetchPriemEducationFormsReducer,
	// createPriemApplications: createPriemApplicationsReducer,
	// fetchPriemGroups: fetchPriemGroupsReducer,
});


export default transactionsReducer;