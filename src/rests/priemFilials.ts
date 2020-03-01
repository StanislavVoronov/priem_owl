import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}
export const priemFilialsRest = () => {

	return PriemApi.selectData<never, IFetchResponse>(PriemRestApi.PriemFilials)
};
