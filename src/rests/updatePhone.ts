import { PriemApi, PriemRestApi } from '$services';

export interface IUpdatePhoneRequest {
	phone: string;
	type: number;
}

export interface IUpdatePhoneResponse {
	ID: number;
}

export const updatePhoneRest = (phone: IUpdatePhoneRequest) =>
	PriemApi.post<IUpdatePhoneRequest, IUpdatePhoneResponse>(PriemRestApi.UpdatePhone, phone);
