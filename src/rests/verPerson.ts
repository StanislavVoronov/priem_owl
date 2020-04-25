import { VerificationMethod } from '$common';

import { ENROLL_API_NAMES, EnrollApi } from '$services';

export interface IVerNpRequest {
	np_uid: number;
	type: string;
}

export interface IVerNpResponse {
	ver_id: number;
}

export const verNpRest = (npId: number, type: string) => {
	const payload: IVerNpRequest = {
		np_uid: npId,
		type,
	};

	return EnrollApi.post<IVerNpRequest, IVerNpResponse>(ENROLL_API_NAMES.VerNp, payload);
};
