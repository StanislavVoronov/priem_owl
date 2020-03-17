import { PriemApi, PRIEM_API_NAMES } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}

interface IFetchRequest {
	filial: number;
	inst: number;
	dir: number;
	educForms: number[];
	noPayForms: number[],
}

export const priemPayFormsRest = (filial: number, inst: number, dir: number, educForms: number[], noPayForms: number[] = [16, 20]) => {
	const payload = {
		filial,
		inst,
		dir,
		noPayForms,
		educForms,
	};

	return PriemApi.select<IFetchRequest, IFetchResponse>(PRIEM_API_NAMES.FetchPriemPayForms, payload);
};
