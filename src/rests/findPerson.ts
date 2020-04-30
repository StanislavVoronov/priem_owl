import { IPerson } from '$common';
import moment from 'moment';
import { PriemApi, PRIEM_API_NAMES } from '$services';

export interface IFindPersonRequest {
	fname: string;
	lname: string;
	mname: string;
	birthdate: string;
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
		birthdate: moment(birthday).format('YYYY.MM.DD'),
	};

	return PriemApi.select<IFindPersonRequest, IFindPersonResponse>(
		PRIEM_API_NAMES.FindPerson,
		payload,
	);
};
