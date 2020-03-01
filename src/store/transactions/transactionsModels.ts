import { ITransaction } from '@black_bird/utils';
import { ICheckLoginResponse, ICreateLoginResponse, IFindPersonResponse } from '$rests';
import { ICreatePersonData, IPriemGroup, ISelectItem } from '$common';

export interface ITransactionsState {
	checkLogin: ITransaction<ICheckLoginResponse>;
	createLogin: ITransaction<ICreateLoginResponse>;
	findPerson: ITransaction<IFindPersonResponse>;
	createPerson: ITransaction<ICreatePersonData>;
	priemFilials: ITransaction<ISelectItem>;
	priemDirections: ITransaction<ISelectItem>;
	priemInstitutes: ITransaction<ISelectItem>;
	priemEducLevels: ITransaction<ISelectItem>;
	priemEducForms: ITransaction<ISelectItem>;
	priemGroups: ITransaction<IPriemGroup>;
	createVerCode: ITransaction<any>;
	priemPayForms: ITransaction<any>;
	priemProfiles: ITransaction<any>;
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
