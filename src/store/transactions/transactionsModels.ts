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
	// updatePhone: Record<string, ITransaction<any>>;
	// updateAddress: Record<string, ITransaction<any>>;
	// createVerificationCode: ITransaction<ICreateVerificationCodeResponse>;
	// uploadDocuments: Record<string, ITransaction<any>>;
	// fetchPriemInstitutes: ITransaction<ISelectItem>;
	// priemEducLevels: ITransaction<ISelectItem>;
	// fetchPriemPayForms: ITransaction<ISelectItem>;
	// fetchPriemGroups: ITransaction<IPriemGroup>;
	// fetchPriemEducationForms: ITransaction<ISelectItem>;
	// createPriemApplications: Record<string, ITransaction<any>>;
}
