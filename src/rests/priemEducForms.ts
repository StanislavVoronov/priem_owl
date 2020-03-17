import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}

interface IFetchRequest {
	filial: number;
	inst: number;
	dir: number;
	noPayForms: number[]
}

export const priemEducFormsRest = (filial: number, inst: number, dir: number, noPayForms: number[] = [16, 20]) => {
	const payload = {
		filial,
		inst,
		dir,
		noPayForms,
	};

	return PriemApi.select<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemEducationForms, payload);
};
