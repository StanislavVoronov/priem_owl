import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}
interface IPayloadRq {
	noPayForms: number[];
}
export const priemFilialsRest = (noPayForms: number[] = [16, 20]) => {
	const payload = {
		noPayForms,
	};

	return PriemApi.select<IPayloadRq, IFetchResponse>(PriemRestApi.PriemFilials, payload);
};
