import { PRIEM_API_NAMES, PriemApi } from '$services';

export const updateCoolnessRest = () => {
	return PriemApi.post(PRIEM_API_NAMES.UpdateCoolness, {});
};
