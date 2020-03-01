import { PriemApi, PriemRestApi } from '$services';
interface IFetchResponse {
	ID: number;
	NAME: string;
}
interface IFetchRequest {
	FILIAL: number;
}
export const fetchPriemInstitutes = (filialId: number) => {
	const payload = {
		FILIAL: filialId,
	};

	return PriemApi.select<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemInstitutes, payload);
};
