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
