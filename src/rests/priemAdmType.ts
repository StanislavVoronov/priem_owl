import { PriemApi, PRIEM_API_NAMES } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}

interface IPayload {
	filial: number;
	inst: number;
	eduLevel: number;
	noPayForms: number[];
}

export const priemAdmTypeRest = (payload: IPayload) => {
	return PriemApi.select<IPayload, IFetchResponse>(PRIEM_API_NAMES.FetchAdmTypes, payload);
};
