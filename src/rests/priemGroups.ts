import { PriemApi, PRIEM_API_NAMES } from '$services';

interface IFetchResponse {
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
	PriemApi.select<IPayload, IFetchResponse>(PRIEM_API_NAMES.FetchPriemGroups, payload);
