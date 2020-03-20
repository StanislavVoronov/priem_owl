import { ITransaction } from '@black_bird/utils';
import { ICheckLoginResponse, ICreateLoginResponse, IFindPersonResponse } from '$rests';
import { ICreatePersonData, IPriemGroup, IDictionary, IAdmDictionaryItem } from '$common';

export interface ITransactionsState {
	checkLogin: ITransaction<ICheckLoginResponse>;
	createLogin: ITransaction<ICreateLoginResponse>;
	findPerson: ITransaction<IFindPersonResponse>;
	createPerson: ITransaction<ICreatePersonData>;
	priemFilials: ITransaction<IAdmDictionaryItem>;
	priemDirections: ITransaction<IAdmDictionaryItem>;
	priemInstitutes: ITransaction<IAdmDictionaryItem>;
	priemEducLevels: ITransaction<IAdmDictionaryItem>;
	priemEducForms: ITransaction<IAdmDictionaryItem>;
	priemGroups: ITransaction<IPriemGroup>;
	createVerCode: ITransaction<any>;
	priemPayForms: ITransaction<any>;
	priemProfiles: ITransaction<IAdmDictionaryItem>;
	priemAdmGroups: Record<string, ITransaction<IAdmDictionaryItem>>;
	updatePhones: Record<string, ITransaction<string>>;
	updateAddresses: Record<string, ITransaction<string>>;
	uploadDocuments: Record<string, ITransaction<string>>;
	createApplications: Record<string, ITransaction<string>>;
	priemLogout: ITransaction<any>;
}
