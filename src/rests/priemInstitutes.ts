import { PriemApi, PRIEM_API_NAMES } from '$services';
interface IFetchResponse {
	ID: number;
	NAME: string;
}

interface IPayload {
	filial: number;
	eduLevel: number;
	noPayForms: number[];
	admType: number;
}
export const priemInstRest = (payload: IPayload) =>
	PriemApi.select<IPayload, IFetchResponse>(PRIEM_API_NAMES.FetchPriemInstitutes, payload);
