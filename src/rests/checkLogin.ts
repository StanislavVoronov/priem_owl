import { PriemApi, PRIEM_API_NAMES } from '$services';

interface ICheckLoginRequest {
	login: string | number;
}

export interface ICheckLoginResponse {
	COUNT: number;
}
export const checkLoginRest = (login: string) => {
	const payload = { login };

	return PriemApi.check<ICheckLoginRequest, ICheckLoginResponse>(PRIEM_API_NAMES.CheckUniqueLogin, payload);
};
