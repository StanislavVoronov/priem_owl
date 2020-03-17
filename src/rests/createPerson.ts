import { ENROLL_API_NAMES, EnrollApi } from '$services';
import { ReactText } from 'react';
import { IDictionary, moment, ServerBoolean } from '$common';

interface ICreatePersonDataRequest {
	email_code: ReactText;
	phone_code: ReactText;
	lname: string;
	fname: string;
	mname: string;
	birthdate: string;
	birthplace: string;
	need_hostel: ServerBoolean;
	sex: number;
	hight_first: ServerBoolean;
	best_prev_edu: number;
	cheat_type: number;
}

export interface ICreatePersonPayload {
	verEmailCode: string;
	verPhoneCode: string;
	lastName: string;
	firstName: string;
	middleName?: string;
	birthDate: string;
	birthplace: string;
	needHostel: boolean;
	gender: string;
	highFirst: string;
	bestPrevEdu: IDictionary | null;
	cheatType: number;
}
export interface ICreatePersonDataResponse {
	np_uid: number;
}

export const createPersonRest = (data: ICreatePersonPayload) => {
	console.log('createPersonRest', data);

	const payload = {
		email_code: data.verEmailCode,
		phone_code: data.verPhoneCode,
		lname: data.lastName,
		fname: data.firstName,
		mname: data.middleName || '',
		birthdate: moment(data.birthDate).format('DD-MM-YYYY'),
		birthplace: data.birthplace,
		need_hostel: data.needHostel ? ServerBoolean.True : ServerBoolean.False,
		sex: Number(data.gender),
		hight_first: data.highFirst ? ServerBoolean.True : ServerBoolean.False,
		best_prev_edu: data.bestPrevEdu ? data.bestPrevEdu.id : 0,
		cheat_type: 0,
	};

	return EnrollApi.post<ICreatePersonDataRequest, ICreatePersonDataResponse>(ENROLL_API_NAMES.SetNewNp, payload);
};
