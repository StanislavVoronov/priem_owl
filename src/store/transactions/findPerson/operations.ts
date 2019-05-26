import { findPersonActions, IPerson, IServerError } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import moment from 'moment';
import { PriemApi, PriemRestApi } from '$services';

export interface IFindPersonRequest {
	fname: string;
	lname: string;
	mname: string;
	birthdate: string;
}

export interface IFindPersonResponse {
	ID: number;
}
export const findPersonTransaction = (data: IPerson): ThunkAction<void, IRootState, void, Action> => dispatch => {
	const { firstName, birthday, lastName, middleName = '' } = data;

	const payload = {
		fname: firstName,
		lname: lastName,
		mname: middleName,
		birthdate: moment(birthday).format('YYYY-MM-DD'),
	};

	dispatch(findPersonActions.request());

	return PriemApi.checkData<IFindPersonRequest, IFindPersonResponse>(PriemRestApi.FindPerson, payload)
		.then(response => dispatch(findPersonActions.success(response)))
		.catch((error: IServerError) => dispatch(findPersonActions.failure(error)));
};
