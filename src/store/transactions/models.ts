import { ITransaction } from '$common';
import { ICheckLoginResponse } from './checkLogin';
import { ICreateLoginResponse } from './createLogin';

export interface ITransactionState {
	checkLogin: ITransaction<ICheckLoginResponse>;
	createLogin: ITransaction<ICreateLoginResponse>;
}
