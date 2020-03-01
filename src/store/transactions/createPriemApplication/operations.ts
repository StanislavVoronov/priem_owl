import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { createPriemApplicationActions } from '$common';

import { PriemRestApi, PriemApi } from '$services';
import { IServerError } from '$common';

interface ICreatePriemApplication {
	admId: number;
	profileId: number;
	priority: number;
}

interface ICreatePriemApplicationRequest {
	ADM_ID: number;
	PROF_ID: number;
	PRIORITY: number;
}

export interface ICreatePriemApplicationResponse {
	count: number;
}

export const createPriemApplicationTransaction = (
	data: ICreatePriemApplication,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	const payload = {
		ADM_ID: data.admId,
		PRIORITY: data.priority,
		PROF_ID: data.profileId,
	};

	dispatch(createPriemApplicationActions.request(data.admId));

	return PriemApi.check<ICreatePriemApplicationRequest, ICreatePriemApplicationResponse>(
		PriemRestApi.AddPriemApplication,
		payload,
	)
		.then(response => {
			dispatch(createPriemApplicationActions.success(data.admId, response));

			return Promise.resolve();
		})
		.catch((error: IServerError) => {
			// dispatch(createPriemApplicationActions.failure(data.admId, error));

			return Promise.reject(error);
		});
};
