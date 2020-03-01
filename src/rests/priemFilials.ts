import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}
export const fetchPriemFilials = () => PriemApi.select<never, IFetchResponse>(PriemRestApi.PriemFilials);
