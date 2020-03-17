import { PriemApi, PriemRestApi } from '$services';

interface IPriemProfilesResponse {
	ID: number;
	NAME: string;
}

interface IPriemProfilesRequest {
	filial: number;
	inst: number;
	dir: number;
	noPayForms: number[]
}

export const priemProfilesRest = (filial: number, inst: number, dir: number, noPayForms: number[] = [16, 20]) => {
	const payload = {
		filial,
		inst,
		dir,
		noPayForms,
	};

	return PriemApi.select<IPriemProfilesRequest, IPriemProfilesResponse>(PriemRestApi.FetchPriemProfiles, payload);
};
