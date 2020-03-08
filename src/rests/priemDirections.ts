import { PriemApi, PriemRestApi } from '$services';

interface IPriemDirectionsResponse {
	ID: number;
	NAME: string;
}

interface IPriemDirectionsRequest {
	filial: number;
	inst: number;
	educLevel: number;
}

interface IPayload {
	filialId: number;
	instId: number;
	educLevelId: number;
}
export const fetchPriemDirections = (filialId: number, educLevelId: number, instId: number) => {
	const payload = {
		filial: filialId,
		inst: instId,
		educLevel: educLevelId,
	};

	return PriemApi.select<IPriemDirectionsRequest, IPriemDirectionsResponse>(PriemRestApi.FetchPriemDirections, payload);
};
