import { PriemApi, PRIEM_API_NAMES } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}

interface IPayload {
	filial: number;
	inst: number;
	dir: number;
	educForms: number[];
	noPayForms: number[];
	admType: number;
}

export const priemPayFormsRest = (payload: IPayload) =>
	PriemApi.selectList<IPayload, IFetchResponse>(PRIEM_API_NAMES.FetchPriemPayForms, payload);
