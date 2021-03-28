import { ReactText } from 'react';

export interface IServerError {
	message: string;
	type?: string;
}

export enum ServerBoolean {
	False = 0,
	True = 1,
}
export interface ICheckPersonExistResponse {
	ID: number;
}

export interface IRegisterNewPersonResponse {
	id: number;
	count: number;
}

export interface ICheckLoginRequest {
	login: ReactText;
}

export interface ICheckPersonExistRequest {
	fname: ReactText;
	lname: ReactText;
	mname: ReactText;
	birthdate: ReactText;
}

export interface IRegisterNewPersonRequest {
	login: ReactText;
	password: ReactText;
}

export interface INewPersonDataRequest {
	email_code: ReactText;
	phone_code: ReactText;
	email: ReactText;
	lname: ReactText;
	fname: ReactText;
	mname: ReactText;
	birthdate: ReactText;
	birthplace: ReactText;
	need_hostel: ServerBoolean;
	sex: number;
	hight_first: ServerBoolean;
	best_prev_edu: number;
	cheat_type: number;
}

export interface INewPersonDataResponse {
	np_uid: number;
}

export interface IConfirmRegisterCodeRequest {
	np_uid: number;
	code: string;
}

export interface IPriemApiServerResponse {
	result: [{ COUNT: number }];
}

export interface IUploadDocRequest {
	mime: string;
	type: number;
	stype: number | null;
	seria: string;
	num: string;
	iss_org: string;
	iss_date: string;
	iss_gov: number;
	page: number
}

export interface IPriemGroup {
	admId: number;
	needDoc: boolean;
}
