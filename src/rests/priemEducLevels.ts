import { PriemApi, PriemRestApi } from '$services';

interface IPriemEducLevelsResponse {
	ID: number;
	NAME: string;
}

interface IPriemEducLevelsRequest {
	FILIAL: number;
	INST: number;
}

interface IPayload {
	filialId: number;
	instituteId: number;
}

export const fetchPriemEducLevels = (
	filialId: number, instId: number
) => {

	const payload = {
		FILIAL: filialId,
		INST: instId,
	};

	return PriemApi.select<IPriemEducLevelsRequest, IPriemEducLevelsResponse>(PriemRestApi.FetchPriemEducationLevels, payload)
};
