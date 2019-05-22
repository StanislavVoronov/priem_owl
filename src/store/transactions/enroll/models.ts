import { ITransaction } from '$common';
import { ReactText } from 'react';

export interface IEnrollTransactionState {
	checkLogin: ITransaction<ICheckLoginResponse>;
}

export interface ICheckLoginRequest {
	login: ReactText;
}

export interface ICheckLoginResponse {
	COUNT: number;
}
