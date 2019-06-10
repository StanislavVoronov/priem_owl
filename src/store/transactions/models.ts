import { ITransaction } from '$common';
import { ICheckLoginResponse } from './checkLogin';
import { ICreateLoginResponse } from './createLogin';
import { ICreateVerificationCodeResponse } from './createVerificationCode';
import { ICreatePersonDataResponse } from './createPerson';
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
}
