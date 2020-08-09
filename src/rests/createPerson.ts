import { ENROLL_API_NAMES, EnrollApi } from '$services';
import { ReactText } from 'react';
import { formatToRemoteDate, IDictionary, moment, ServerBoolean } from '$common';

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
	birthday: string;
	birthplace: string;
	needHostel: boolean;
	gender: string;
	highFirst: string;
	bestPrevEdu: IDictionary | null;
	cheatType?: number;
	email: string;
	phone: string;
}
export interface ICreatePersonDataResponse {
	np_uid: number;
}

export const createPersonRest = (data: ICreatePersonPayload) => {
	const payload = {
		email_code: data.verEmailCode,
		phone_code: data.verPhoneCode,
		lname: data.lastName,
		fname: data.firstName,
		mname: data.middleName || '',
		birthdate: formatToRemoteDate(data.birthday),
		birthplace: data.birthplace,
		need_hostel: data.needHostel ? ServerBoolean.True : ServerBoolean.False,
		sex: Number(data.gender),
		hight_first: data.highFirst ? ServerBoolean.True : ServerBoolean.False,
		best_prev_edu: data.bestPrevEdu ? data.bestPrevEdu.id : 0,
		cheat_type: data.cheatType || 0,
		email: data.email,
		phone: data.phone,
	};

	return EnrollApi.post<ICreatePersonDataRequest, ICreatePersonDataResponse>(
		ENROLL_API_NAMES.SetNewNp,
		payload,
	);
};
