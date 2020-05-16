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
	verPersonContactsReducer,
	setExistPersonVerCodeReducer,
	updateLoginTrnReducer,
	priemAdmTypesReducer,
	updatePhoneTransactionReducer,
	personDocumentsReducer,
	personInfoReducer,
} from './transactions';
import {
	IAdmDictionaryItem,
	ICreatePersonData,
	IRemoteDocument,
	IPersonInfo,
	IPriemGroup,
} from '$common';
import {
	ICheckLoginResponse,
	ICreateLoginResponse,
	ICreateVerCodeResponse,
	IFindPersonResponse,
	IVerPersonContactsResponse,
} from '$rests';
import type { IAdmTransactionList } from './models';

export interface ITransactionsState {
	checkLogin: ITransaction<ICheckLoginResponse>;
	createLogin: ITransaction<ICreateLoginResponse>;
	findPerson: ITransaction<IFindPersonResponse>;
	createPerson: ITransaction<ICreatePersonData>;
	priemFilials: IAdmTransactionList;
	priemEducForms: IAdmTransactionList;
	priemDirections: IAdmTransactionList;
	priemInstitutes: IAdmTransactionList;
	priemEducLevels: IAdmTransactionList;
	priemAdmGroups: Record<string, ITransaction<IPriemGroup>>;
	createVerCode: ITransaction<ICreateVerCodeResponse>;
	priemAdmTypes: IAdmTransactionList;
	priemPayForms: IAdmTransactionList;
	priemProfiles: IAdmTransactionList;
	updatePhones: Record<string, ITransaction<string>>;
	updateAddresses: Record<string, ITransaction<string>>;
	uploadDocuments: Record<string, ITransaction<string>>;
	createApplications: Record<string, ITransaction<string>>;
	priemLogout: ITransaction<any>;
	verNp: ITransaction<{ ver_id: number }>;
	verPersonContacts: ITransaction<IVerPersonContactsResponse>;
	setExistPersonVerCode: ITransaction<any>;
	updateLogin: ITransaction<any>;
	personDocuments: ITransaction<IRemoteDocument[]>;
	personInfo: ITransaction<IPersonInfo>;
}

const transactionsReducer = combineReducers<ITransactionsState>({
	checkLogin: checkLoginReducer,
	createLogin: createLoginReducer,
	createPerson: createPersonReducer,
	priemFilials: priemFilialsReducer,
	findPerson: findPersonReducer,
	priemEducForms: priemEducFormsReducer,
	priemDirections: priemDirectionsReducer,
	priemInstitutes: priemInstitutesReducer,
	priemEducLevels: priemEducLevelsReducer,
	priemAdmGroups: priemAdmGroupsReducer,
	createVerCode: createVerCodeReducer,
	priemAdmTypes: priemAdmTypesReducer,
	priemPayForms: priemPayFormsReducer,
	priemProfiles: priemProfilesReducer,
	updateAddresses: updateAddressesReducer,
	uploadDocuments: uploadDocumentsReducer,
	priemLogout: priemLogoutReducer,
	createApplications: createApplicationReducer,
	verNp: verPersonReducer,
	verPersonContacts: verPersonContactsReducer,
	setExistPersonVerCode: setExistPersonVerCodeReducer,
	updateLogin: updateLoginTrnReducer,
	updatePhones: updatePhoneTransactionReducer,
	personDocuments: personDocumentsReducer,
	personInfo: personInfoReducer,
});

export default transactionsReducer;
