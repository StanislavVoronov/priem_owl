import { PriemApi, PRIEM_API_NAMES } from '$services';
import { PhoneType } from '$common';

export interface IUpdatePhoneRequest {
	phone: string;
	type: PhoneType;
}

export interface IUpdatePhoneResponse {
	ID: number;
}

export const updatePhoneRest = (phone: string, type: PhoneType) =>
	PriemApi.post<IUpdatePhoneRequest, IUpdatePhoneResponse>(PRIEM_API_NAMES.UpdatePhone, { phone, type });
