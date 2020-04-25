import { ENROLL_API_NAMES, EnrollApi } from '$services';

export interface ISetExistPersonVerCodeRequest {
	code: string;
	np_uid: number;
}

export interface ISetExistPersonVerCodeResponse {
	ver_id: number;
}

export const setExistPersonVerCodeRest = (npId: number, code: string) => {
	const payload = {
		code,
		np_uid: npId,
	};

	return EnrollApi.post<ISetExistPersonVerCodeRequest, ISetExistPersonVerCodeResponse>(
		ENROLL_API_NAMES.SetNp,
		payload,
	);
};
