import { ITransaction } from '$common';
import { ICheckLoginResponse } from './checkLogin';
import { ICreateLoginResponse } from './createLogin';
import { ICreateVerificationCodeResponse } from './createVerificationCode';

export interface ITransactionState {
	checkLogin: ITransaction<ICheckLoginResponse>;
	createLogin: ITransaction<ICreateLoginResponse>;
	findPerson: ITransaction<ICreateLoginResponse>;
	createVerificationCode: ITransaction<ICreateVerificationCodeResponse>;
}
