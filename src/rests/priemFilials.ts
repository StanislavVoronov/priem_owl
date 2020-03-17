import { PriemApi, PRIEM_API_NAMES } from '$services';

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

	return PriemApi.select<IPayloadRq, IFetchResponse>(PRIEM_API_NAMES.PriemFilials, payload);
};
