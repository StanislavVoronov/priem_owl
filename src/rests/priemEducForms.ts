import { PriemApi, PRIEM_API_NAMES } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}

interface IPayload {
	filial: number;
	inst: number;
	dir: number;
	noPayForms: number[];
	admType: number;
}

export const priemEducFormsRest = (payload: IPayload) => {
	return PriemApi.selectList<IPayload, IFetchResponse>(
		PRIEM_API_NAMES.FetchPriemEducationForms,
		payload,
	);
};
