import { formatToRemoteDate, IPerson } from '$common';
import { formatDate } from '@black_bird/utils';
import { PriemApi, PRIEM_API_NAMES } from '$services';

export interface IFindPersonRequest {
	fname: string;
	lname: string;
	mname: string;
	birthdate: string;
	default_birthdate?: string;
}

export interface IFindPersonResponse {
	ID: number;
}
export const findPersonRest = (data: IPerson) => {
	const { firstName, birthday, lastName, middleName = '' } = data;

	const payload = {
		fname: firstName,
		lname: lastName,
		mname: middleName,
		birthdate: formatToRemoteDate(birthday),
		default_birthdate: birthday,
	};

	return PriemApi.select<IFindPersonRequest, IFindPersonResponse>(
		PRIEM_API_NAMES.FindPerson,
		payload,
	);
};
