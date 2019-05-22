import moment from 'moment';
import { Gender, ServerBoolean } from '../../common';
import { ReactText } from 'react';

export interface ICheckPersonExistResponse {
	ID: number;
}

export interface ICheckLoginResponse {
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

export interface IVerifyPersonRequest {
	email: string;
	not_use_phone: number;
	mobile_phone: string;
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

export interface IUploadDocPayload {
	mime: string | null;
	type: number;
	stype: number | null;
	seria: string;
	num: string;
	iss_org: string;
	iss_date: string;
	iss_gov: number;
}
