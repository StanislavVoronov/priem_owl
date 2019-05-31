import { createPersonActions, ServerBoolean } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { EnrollRestApi, PriemEnroll } from '$services';
import { ReactText } from 'react';

interface ICreatePersonDataRequest {
	email_code: ReactText;
	phone_code: ReactText;
	email: ReactText;
	lname: ReactText;
	fname: ReactText;
	mname: ReactText;
	birthdate: ReactText;
	birthplace: ReactText;
	need_hostel: ServerBoolean;
	sex: number;
	hight_first: ServerBoolean;
	best_prev_edu: number;
	cheat_type: number;
}

export interface ICreatePersonDataResponse {
	np_uid: number;
}

export const createPersonTransaction = (
	data: ICreatePersonDataRequest,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	dispatch(createPersonActions.request());

	return PriemEnroll.post<ICreatePersonDataRequest, ICreatePersonDataResponse>(EnrollRestApi.SetNewNp, {
		...data,
	})
		.then(response => {
			console.log('response', response);
			dispatch(createPersonActions.success([response]));
		})
		.catch(error => {
			dispatch(createPersonActions.failure(error));
		});
};
