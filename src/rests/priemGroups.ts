import { IServerError, IDictionary, priemEducFormsTransactionActions } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	ID: number;
	NEED_DOC: string;
}

interface IFetchRequest {
	filial: number;
	inst: number;
	dir: number;
	payForm: number;
	educForm: number;
}

export const fetchPriemGroups = (
	filialId: number,
	instituteId: number,
	directionId: number,
	educForm: number,
	payForm: number,
) => {
	const payload = {
		filial: filialId,
		inst: instituteId,
		dir: directionId,
		educForm,
		payForm,
	};

	return PriemApi.select<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemGroups, payload);
};
