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

interface IPayload {
	filialId: number;
	instituteId: number;
	directionId: number;
}
export const priemProfilesRest = (
	data: IPayload,
) => {

	const payload = {
		FILIAL: data.filialId,
		INST: data.instituteId,
		DIR: data.directionId,
	};

	return PriemApi.selectData<IPriemProfilesRequest, IPriemProfilesResponse>(PriemRestApi.FetchPriemProfiles, payload)
};
