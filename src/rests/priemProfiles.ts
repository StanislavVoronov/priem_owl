import { PriemApi, PriemRestApi } from '$services';

interface IPriemProfilesResponse {
	ID: number;
	NAME: string;
}

interface IPriemProfilesRequest {
	FILIAL: number;
	INST: number;
	DIR: number;
}

export const fetchPriemProfiles = (filialId: number, instituteId: number, directionId: number) => {
	const payload = {
		FILIAL: filialId,
		INST: instituteId,
		DIR: directionId,
	};

	return PriemApi.select<IPriemProfilesRequest, IPriemProfilesResponse>(PriemRestApi.FetchPriemProfiles, payload);
};
