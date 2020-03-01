import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	result: Array<{ ID: number; NAME: string }>;
}
export const priemFilialsRest = () => {
	return PriemApi.selectData<never, IFetchResponse>(PriemRestApi.PriemFilials).then(response =>
		Promise.resolve(response.result),
	);
};
