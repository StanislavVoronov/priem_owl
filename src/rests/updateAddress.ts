import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { PriemApi, PRIEM_API_NAMES } from '$services';

export interface IContactRequest {
	address: string;
	type: number;
}

export interface IContactResponse {
	[key: string]: string;
}
export const updateAddressRest = (address: string, type: number) => {
	const payload = {
		address,
		type,
	};

	return PriemApi.post<IContactRequest, IContactResponse>(PRIEM_API_NAMES.UpdateAddress, payload);
};
