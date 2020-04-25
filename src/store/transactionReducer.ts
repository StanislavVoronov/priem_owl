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
	createApplicationReducer,
	verPersonReducer,
	ITransactionsState,
	verPersonContactsReducer,
} from './transactions';
import { setExistPersonVerCodeReducer } from './transactions/setExistsPersonVerCode';

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
	createApplications: createApplicationReducer,
	verNp: verPersonReducer,
	verPersonContacts: verPersonContactsReducer,
	setExistPersonVerCode: setExistPersonVerCodeReducer,
});

export default transactionsReducer;
