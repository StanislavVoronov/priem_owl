import { PriemApi, PriemRestApi } from '$services';

interface ICreateLoginRequest {
	login: string;
	password: string;
}

export interface ICreateLoginResponse {
	id: number;
	count: number;
}

export const fetchCreateLogin = (login: string, password: string) =>
	PriemApi.post<ICreateLoginRequest, ICreateLoginResponse>(PriemRestApi.AddEnroll, {
		login,
		password,
	});
