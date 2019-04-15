import moment from 'moment';
import { Gender, ServerBoolean } from '../../common';

export interface ICheckPersonExistResponse {
	ID: number;
}

export interface ICheckPersonLoginResponse {
	COUNT: number;
}

export interface IRegisterNewPersonResponse {
	id: number;
	count: number;
}

export interface IVerifyPersonResponse {
	id: number;
	count: number;
}

export interface ICheckPersonLoginRequest {
	login: string;
}

export interface ICheckPersonExistRequest {
	fname: string;
	lname: string;
	mname: string;
	birthdate: string;
}

export interface IRegisterNewPersonRequest {
	login: string;
	password: string;
}

export interface IVerifyPersonRequest {
	email: string;
	not_use_phone: number;
	mobile_phone: string;
}

export interface INewPersonDataRequest {
	email_code: number;
	phone_code: string;
	email: string;
	lname: string;
	fname: string;
	mname: string;
	birthdate: string;
	birthplace: string;
	need_hostel: ServerBoolean;
	sex: Gender;
	hight_first: ServerBoolean;
	best_prev_edu: number;
	cheat_type: number;
}

export interface INewPersonDataResponse {
	np_uid: string;
}

export interface IServerError {
	message: string;
	type?: string;
}

export interface IConfirmRegisterCodeRequest {
	np_uid: number;
	code: string;
}

export interface IPriemApiServerResponse {
	result: [{ COUNT: number }];
}

export interface IUploadDocPayload {
	mime: string | null;
	type: number;
	stype: number | null;
	seria: string;
	num: string;
	iss_org: string;
	iss_date: string;
	iss_gov: number; //default 1 - Russia
}
// //
// [
// 	{ a: 0, d: 'in', n: 'mime', t: 'string' },
// 	{ a: 0, d: 'in', n: 'page', t: 'blob' },
// 	{ a: 0, d: 'in', n: 'docType', t: 'int' },
// 	{ a: 0, d: 'in', n: 'stype', t: 'int' },
// 	{ a: 0, d: 'in', n: 'seria', t: 'string' },
// 	{ a: 0, d: 'in', n: 'num', t: 'string' },
// 	{ a: 0, d: 'in', n: 'iss_date', t: 'string' },
// 	{ a: 0, d: 'in', n: 'iss_org', t: 'string' },
// 	{ a: 0, d: 'in', n: 'iss_gov', t: 'int' },
// 	{ a: 0, d: 'out', n: 'id', t: 'int' },
// ];
