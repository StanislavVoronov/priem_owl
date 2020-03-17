import { PriemApi, PRIEM_API_NAMES } from '$services';

interface ICreateLoginRequest {
	login: string;
	password: string;
}

export interface ICreateLoginResponse {
	id: number;
	count: number;
}

export const createLoginRest = (login: string, password: string) =>
	PriemApi.post<ICreateLoginRequest, ICreateLoginResponse>(PRIEM_API_NAMES.AddEnroll, {
		login,
		password,
	});
