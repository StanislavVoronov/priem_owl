import { PRIEM_API_NAMES, PriemApi } from '$services';

interface ICreatePriemApplicationRequest {
	adm: number;
	prof: number;
	priority: number;
}

export interface ICreatePriemApplicationResponse {
	count: number;
}

export const createApplicationRest = (adm: number, prof: number, priority: number, flow: number) => {
	const payload = {
		adm,
		priority,
		prof,
		flow,
	};

	return PriemApi.post<ICreatePriemApplicationRequest, ICreatePriemApplicationResponse>(
		PRIEM_API_NAMES.AddPriemApplication,
		payload,
	);
};
