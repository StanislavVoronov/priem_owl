import { PriemApi, PriemRestApi } from '$services';
interface IFetchResponse {
	ID: number;
	NAME: string;
}
interface IFetchRequest {
	filial: number;
	eduLevel: number;
}
export const fetchPriemInstitutes = (filialId: number, eduLevelId: number) => {
	const payload = {
		filial: filialId,
		eduLevel: eduLevelId
	};

	return PriemApi.select<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemInstitutes, payload);
};
