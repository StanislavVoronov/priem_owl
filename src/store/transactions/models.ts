import { IPriemGroup, ISelectItem, ITransaction } from '$common';
import { ICheckLoginResponse } from './checkLogin';
import { ICreateLoginResponse } from './createLogin';
import { ICreateVerificationCodeResponse } from './createVerificationCode';
import { ICreatePersonDataResponse, IPriemFilial } from './createPerson';
import { IFindPersonResponse } from './findPerson';

export interface ITransactionState {
	checkLogin: ITransaction<ICheckLoginResponse>;
	createLogin: ITransaction<ICreateLoginResponse>;
	findPerson: ITransaction<IFindPersonResponse>;
	createPerson: ITransaction<ICreatePersonDataResponse>;
	updatePhone: Record<string, ITransaction<any>>;
	updateAddress: Record<string, ITransaction<any>>;
	createVerificationCode: ITransaction<ICreateVerificationCodeResponse>;
	uploadDocuments: Record<string, ITransaction<any>>;
	fetchPriemFilials: ITransaction<ISelectItem>;
	fetchPriemInstitutes: ITransaction<ISelectItem>;
	fetchPriemEducationLevels: ITransaction<ISelectItem>;
	fetchPriemPayForms: ITransaction<ISelectItem>;
	fetchPriemGroups: ITransaction<IPriemGroup>;
	fetchPriemEducationForms: ITransaction<ISelectItem>;
	fetchPriemDirections: ITransaction<ISelectItem>;
	fetchPriemProfiles: ITransaction<ISelectItem>;
	createPriemApplications: Record<string, ITransaction<any>>;
}
