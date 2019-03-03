import { IRegisterFormData } from './models';

import { IRootState, IServerResponseResult } from '../../common';
import PriemApi from '../../modules/PriemApi';
import {
	checkPersonExistFailure,
	checkPersonExistRequest,
	checkPersonExistSuccess,
	checkPersonLoginRequest,
	checkPersonLoginSuccess,
	checkPersonLoginFailure,
	registerNewPersonFetching,
	registerNewPersonFailure,
	registerNewPersonSuccess,
	enrollPersonData,
} from './actions';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ICheckPersonExistResponse, ICheckPersonLoginResponse, IRegisterNewPersonResponse } from './ServerModels';
import { ApiName } from './apiName';
export const fetchPersonVerificationData = (id: number): ThunkAction<void, IRootState, void, Action> => dispatch => {
	const payload = {
		id,
	};
};
export const checkPersonExist = (data: IRegisterFormData): ThunkAction<void, IRootState, void, Action> => dispatch => {
	const { firstName, birthday, lastName, middleName = '' } = data;

	const payload = { fname: firstName, lname: lastName, mname: middleName, birthdate: birthday };
	dispatch(checkPersonExistRequest());

	dispatch(enrollPersonData(data));

	PriemApi.fetchData<IServerResponseResult<ICheckPersonExistResponse>>(ApiName.FindNpId, payload)
		.then(data => {
			if (data.result.length > 0) {
				const personId = data.result[0].ID;
				dispatch(checkPersonExistSuccess(personId));
				dispatch(fetchPersonVerificationData(personId));
			} else {
				dispatch(checkPersonExistSuccess(0));
			}
		})
		.catch(error => dispatch(checkPersonExistFailure(error)));
};

export const checkPersonLogin = (login: string): ThunkAction<void, IRootState, void, Action> => dispatch => {
	const payload = { login };
	if (login.length > 5) {
		dispatch(checkPersonLoginRequest());

		PriemApi.fetchData<IServerResponseResult<ICheckPersonLoginResponse>>(ApiName.TestUniqueEnroll, payload)
			.then(data => {
				if (data.result.length > 0) {
					dispatch(checkPersonLoginSuccess(data.result[0].COUNT > 0));
				}
			})
			.catch(error => dispatch(checkPersonLoginFailure(error)));
	}
};

export const registerNewPerson = (
	login: string,
	password: string,
): ThunkAction<Promise<number>, IRootState, void, Action> => dispatch => {
	const payload = { login, password };

	return Promise.resolve(1);
	dispatch(registerNewPersonFetching());

	return PriemApi.fetchData<IRegisterNewPersonResponse>(ApiName.AddEnroll, payload)
		.then(response => {
			dispatch(registerNewPersonSuccess(response.id));
			return response.id;
		})
		.catch(error => {
			dispatch(registerNewPersonFailure(error));
			return 0;
		});
};
