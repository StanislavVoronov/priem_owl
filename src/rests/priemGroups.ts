import { PriemApi, PRIEM_API_NAMES } from '$services';

export interface IAdmGroupResponse {
	ID: number;
	NEED_DOC: string;
}

interface IPayload {
	filial: number;
	inst: number;
	dir: number;
	eduForm: number;
	payForm: number;
	admType: number;
}

export const priemAdmGroupsRest = (payload: IPayload) =>
	PriemApi.select<IPayload, IAdmGroupResponse>(PRIEM_API_NAMES.FetchPriemGroups, payload);
