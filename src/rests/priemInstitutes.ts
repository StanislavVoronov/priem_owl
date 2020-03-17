import { PriemApi, PriemRestApi } from '$services';
interface IFetchResponse {
	ID: number;
	NAME: string;
}
interface IFetchRequest {
	filial: number;
	educLevel: number;
	noPayForms: number[]
}
export const priemInstRest = (filialId: number, eduLevelId: number, noPayForms: number[] = [16, 20]) => {
	const payload = {
		filial: filialId,
		educLevel: eduLevelId,
		noPayForms,
	};

	return PriemApi.select<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemInstitutes, payload);
};
