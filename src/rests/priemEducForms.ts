import { PriemApi, PRIEM_API_NAMES } from '$services';

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

	return PriemApi.select<IFetchRequest, IFetchResponse>(PRIEM_API_NAMES.FetchPriemEducationForms, payload);
};
