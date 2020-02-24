import { PriemApi, PriemRestApi } from '$services';

interface ICheckLoginRequest {
	login: string | number;
}

export interface ICheckLoginResponse {
	COUNT: number;
}
export const checkLoginRest = (login: string) => {
	const payload = { login };

	return PriemApi.checkData<ICheckLoginRequest, ICheckLoginResponse>(PriemRestApi.CheckUniqueLogin, payload)
};
