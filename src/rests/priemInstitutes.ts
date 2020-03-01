import { PriemApi, PriemRestApi } from '$services';
interface IFetchResponse {
	ID: number;
	NAME: string;
}
interface IFetchRequest {
	FILIAL: number;
}
export const priemInstitutesRest = (filialId: number) => {
	const payload = {
		FILIAL: filialId,
	};

	return PriemApi.selectData<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemInstitutes, payload);
};
