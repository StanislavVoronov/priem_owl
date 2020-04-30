import { PRIEM_API_NAMES, PriemApi } from '$services';

export const updateLoginRest = (login: string) => {
	return PriemApi.post(PRIEM_API_NAMES.UpdateLogin, { login });
};
