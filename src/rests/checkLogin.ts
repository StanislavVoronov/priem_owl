import { PriemApi, PriemRestApi } from '$services';

interface ICheckLoginRequest {
	login: string | number;
}

export interface ICheckLoginResponse {
	COUNT: number;
}
export const fetchCheckLogin = (login: string) => {
	const payload = { login };

	return PriemApi.check<ICheckLoginRequest, ICheckLoginResponse>(PriemRestApi.CheckUniqueLogin, payload)
};
