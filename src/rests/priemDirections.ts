import { PriemApi, PRIEM_API_NAMES } from '$services';

interface IPriemDirectionsResponse {
	ID: number;
	NAME: string;
}

interface IPayload {
	filial: number;
	inst: number;
	eduLevel: number;
	noPayForms: number[];
	admType: number;
}

export const priemDirectionRest = (payload: IPayload) =>
	PriemApi.select<IPayload, IPriemDirectionsResponse>(
		PRIEM_API_NAMES.FetchPriemDirections,
		payload,
	);
