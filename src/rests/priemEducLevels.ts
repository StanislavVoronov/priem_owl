import { PriemApi, PriemRestApi } from '$services';

interface IPriemEducLevelsResponse {
	ID: number;
	NAME: string;
}

interface IPriemEducLevelsRequest {
	filial: number;
}

interface IPayload {
	filialId: number;
}

export const fetchPriemEducLevels = (
	filialId: number
) => {

	const payload = {
		filial: filialId,
	};

	return PriemApi.select<IPriemEducLevelsRequest, IPriemEducLevelsResponse>(PriemRestApi.FetchPriemEducationLevels, payload)
};
