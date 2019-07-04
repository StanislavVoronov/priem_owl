import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { checkLoginActions, createPriemApplicationActions } from '$common';

import { PriemRestApi, PriemApi } from '$services';
import { IServerError } from '$common';

interface ICreatePriemApplicationRequest {
	admId: number;
	profileId: number;
	priority: number;
}

export interface ICreatePriemApplicationResponse {
	COUNT: number;
}

export const createPriemApplicationTransaction = (
	data: ICreatePriemApplicationRequest,
): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	const { admId, priority, profileId } = data;
	const payload = {
		admId,
		priority,
		profileId,
	};

	dispatch(createPriemApplicationActions.request(admId));

	return PriemApi.checkData<ICreatePriemApplicationRequest, ICreatePriemApplicationResponse>(
		PriemRestApi.CheckUniqueLogin,
		payload,
	)
		.then(data => {
			dispatch(createPriemApplicationActions.success(admId, data));

			return Promise.resolve();
		})
		.catch((error: IServerError) => {
			dispatch(createPriemApplicationActions.failure(admId, error));

			return Promise.reject(error);
		});
};
