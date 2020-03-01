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
	FILIAL: number;
	INST: number;
	DIR: number;
}

export const fetchPriemEducForms = (filialId: number, instituteId: number, directionId: number) => {
	const payload = {
		FILIAL: filialId,
		INST: instituteId,
		DIR: directionId,
	};

	return PriemApi.select<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemEducationForms, payload);
};
