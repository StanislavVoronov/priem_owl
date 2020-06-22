import { PriemApi, PRIEM_API_NAMES } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}

interface IPayload {
	filial: number;
	eduLevel: number;
	noPayForms: number[];
}

export const priemAdmTypeRest = (payload: IPayload) => {
	return PriemApi.selectList<IPayload, IFetchResponse>(PRIEM_API_NAMES.FetchAdmTypes, payload);
};
