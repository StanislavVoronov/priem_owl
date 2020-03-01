import { PriemApi, PriemRestApi } from '$services';

interface IPriemDirectionsResponse {
	ID: number;
	NAME: string;
}

interface IPriemDirectionsRequest {
	FILIAL: number;
	INST: number;
	LVL: number;
}

interface IPayload {
	filialId: number;
	instituteId: number;
	educationLevelId: number;
}
export const fetchPriemDirections = (filialId: number, instituteId: number, educLevelId: number) => {
	const payload = {
		FILIAL: filialId,
		INST: instituteId,
		LVL: educLevelId,
	};

	return PriemApi.select<IPriemDirectionsRequest, IPriemDirectionsResponse>(PriemRestApi.FetchPriemDirections, payload);
};
