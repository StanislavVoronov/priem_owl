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
	PROFILE: number;
}

interface IPayload {
	filialId: number;
	instituteId: number;
	directionId: number;
	profileId: number;
}
export const priemEducFormsRest = (data: IPayload) => {
	const payload = {
		FILIAL: data.filialId,
		INST: data.instituteId,
		DIR: data.directionId,
		PROFILE: data.profileId,
	};

	return PriemApi.selectData<IFetchRequest, IFetchResponse>(PriemRestApi.FetchPriemEducationForms, payload);
};
