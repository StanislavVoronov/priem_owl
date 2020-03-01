import { createPersonTransactionActions, ServerBoolean } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { EnrollRestApi, PriemEnroll } from '$services';
import { ReactText } from 'react';

interface ICreatePersonDataRequest {
	email_code: ReactText;
	phone_code: ReactText;
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

export interface IPriemFilial {
	id: string;
	name: string;
}

export const createPersonTransaction = (
	data: ICreatePersonDataRequest,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	dispatch(createPersonTransactionActions.request());

	return PriemEnroll.post<ICreatePersonDataRequest, ICreatePersonDataResponse>(EnrollRestApi.SetNewNp, {
		...data,
	})
		.then(response => {
			dispatch(createPersonTransactionActions.success([{ npId: response.np_uid }]));

			return Promise.resolve();
		})
		.catch(error => {
			console.log('createPersonTransaction', error);
			dispatch(createPersonTransactionActions.failure(error));

			return Promise.reject(error);
		});
};
