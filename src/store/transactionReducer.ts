import { combineReducers, ITransaction } from '@black_bird/utils';
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
	createPersonReducer,
	updateAddressesReducer,
	uploadDocumentsReducer,
	priemLogoutReducer,
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
	createPerson: createPersonReducer,
	updateAddresses: updateAddressesReducer,
	uploadDocuments: uploadDocumentsReducer,
	priemLogout: priemLogoutReducer,
});

export default transactionsReducer;
