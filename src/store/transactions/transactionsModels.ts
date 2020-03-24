import { ITransaction } from '@black_bird/utils';
import { ICheckLoginResponse, ICreateLoginResponse, IFindPersonResponse } from '$rests';
import { ICreatePersonData, IPriemGroup, IDictionary, IAdmDictionaryItem } from '$common';

export type IAdmTransactionList = ITransaction<IAdmDictionaryItem[]>;

export interface ITransactionsState {
	checkLogin: ITransaction<ICheckLoginResponse>;
	createLogin: ITransaction<ICreateLoginResponse>;
	findPerson: ITransaction<IFindPersonResponse>;
	createPerson: ITransaction<ICreatePersonData>;
	priemFilials: IAdmTransactionList;
	priemDirections: IAdmTransactionList;
	priemInstitutes: IAdmTransactionList;
	priemEducLevels: IAdmTransactionList;
	priemEducForms: IAdmTransactionList;
	priemGroups: ITransaction<IPriemGroup[]>;
	createVerCode: ITransaction<any>;
	priemPayForms: ITransaction<any>;
	priemProfiles: IAdmTransactionList;
	priemAdmGroups: Record<string, IAdmTransactionList>;
	updatePhones: Record<string, ITransaction<string>>;
	updateAddresses: Record<string, ITransaction<string>>;
	uploadDocuments: Record<string, ITransaction<string>>;
	createApplications: Record<string, ITransaction<string>>;
	priemLogout: ITransaction<any>;
}
