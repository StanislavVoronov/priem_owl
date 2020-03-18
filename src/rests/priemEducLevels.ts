import { PriemApi, PRIEM_API_NAMES } from '$services';

interface IPriemEducLevelsResponse {
	ID: number;
	NAME: string;
}

interface IPriemEducLevelsRequest {
	filial: number;
	noPayForms: number[];
}

export const priemEducLevelsRest = (filial: number, noPayForms: number[] = [16, 20]) => {
	const payload = {
		filial,
		noPayForms,
	};

	return PriemApi.select<IPriemEducLevelsRequest, IPriemEducLevelsResponse>(
		PRIEM_API_NAMES.FetchPriemEducationLevels,
		payload,
	);
};
