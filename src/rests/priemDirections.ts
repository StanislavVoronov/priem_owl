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
export const priemDirectionsRest = (
	data: IPayload,
) => {

	const payload = {
		FILIAL: data.filialId,
		INST: data.instituteId,
		LVL: data.educationLevelId,
	};

	return PriemApi.selectData<IPriemDirectionsRequest, IPriemDirectionsResponse>(PriemRestApi.FetchPriemDirections, payload)

};
