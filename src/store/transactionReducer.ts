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
	uploadDocumentsReducer
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
	uploadDocuments: uploadDocumentsReducer
});

export default transactionsReducer;
