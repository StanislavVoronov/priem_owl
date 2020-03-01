import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}

interface IFetchRequest {
	FILIAL: number;
	INST: number;
	DIR: number;
	PROFILE: number;
	FOE: number;
}

interface IPayload {
	filialId: number;
	instituteId: number;
	educationFormId: number;
	directionId: number;
	profileId: number;
}
export const primPayFormsRest = (
	data: IPayload,
) => {

	const payload = {
		FILIAL: data.filialId,
		INST: data.instituteId,
		FOE: data.educationFormId,
		DIR: data.directionId,
		PROFILE: data.profileId,
	};

	return PriemApi.selectData<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemPayForms, payload)
};
