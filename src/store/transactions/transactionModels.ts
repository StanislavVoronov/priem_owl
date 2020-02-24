import { ICreatePersonData, IPriemGroup, ISelectItem, ITransaction } from '$common';

import { ICreateVerificationCodeResponse } from './createVerificationCode';
import { ICheckLoginResponse, ICreateLoginResponse, IFindPersonResponse } from '$rests';

export interface ITransactionState {
	checkLogin: ITransaction<ICheckLoginResponse>;
	createLogin: ITransaction<ICreateLoginResponse>;
	findPerson: ITransaction<IFindPersonResponse>;
	createPerson: ITransaction<ICreatePersonData>;
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
