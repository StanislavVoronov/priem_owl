import { PriemApi, PRIEM_API_NAMES } from '$services';

interface IFetchResponse {
	ID: number;
	NEED_DOC: string;
}

interface IFetchRequest {
	filial: number;
	inst: number;
	dir: number;
	payForm: number;
	educForm: number;
}

export const priemAdmGroupsRest = (
	filialId: number,
	instituteId: number,
	directionId: number,
	educForm: number,
	payForm: number,
) => {
	const payload = {
		filial: filialId,
		inst: instituteId,
		dir: directionId,
		educForm,
		payForm,
	};

	return PriemApi.select<IFetchRequest, IFetchResponse>(PRIEM_API_NAMES.FetchPriemGroups, payload);
};
