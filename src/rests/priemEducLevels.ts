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

export const priemEducLevelsRest = (
	data: IPayload,
) => {

	const payload = {
		FILIAL: data.filialId,
		INST: data.instituteId,
	};

	return PriemApi.selectData<IPriemEducLevelsRequest, IPriemEducLevelsResponse>(PriemRestApi.FetchPriemEducationLevels, payload)
};
