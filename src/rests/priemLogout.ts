import { PriemApi, PRIEM_API_NAMES } from '$services';

export const priemLogoutRest = () => PriemApi.post(PRIEM_API_NAMES.PriemLogout, {});
