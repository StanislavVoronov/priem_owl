import { PriemApi, PRIEM_API_NAMES } from '$services';

interface IPriemDirectionsResponse {
	ID: number;
	NAME: string;
}

interface IPriemDirectionsRequest {
	filial: number;
	inst: number;
	educLevel: number;
	noPayForms: number[];
}

export const priemDirectionRest = (
	filial: number,
	educLevel: number,
	inst: number,
	noPayForms: number[] = [16, 20],
) => {
	const payload = {
		filial,
		inst,
		educLevel,
		noPayForms,
	};

	return PriemApi.select<IPriemDirectionsRequest, IPriemDirectionsResponse>(
		PRIEM_API_NAMES.FetchPriemDirections,
		payload,
	);
};
