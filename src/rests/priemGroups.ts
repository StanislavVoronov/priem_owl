import { IServerError, IDictionary, priemEducFormsTransactionActions } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import { PriemApi, PriemRestApi } from '$services';

interface IFetchResponse {
	ID: number;
	NAME: string;
}

interface IFetchRequest {
	filial: number;
	inst: number;
	dirs: number;
	payForms: number[];
	educForms: number[]
}

export const fetchPriemGroups = (filialId: number, instituteId: number, directionId: number, educForms: number[], payForms: number[]) => {
	const payload = {
		filial: filialId,
		inst: instituteId,
		dirs: directionId,
		payForms,
		educForms
	};

	return PriemApi.select<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemGroups, payload);
};
