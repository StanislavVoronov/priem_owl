import { ENROLL_API_NAMES, EnrollApi } from '$services';

export interface ISetExistPersonVerCodeRequest {
	code: string;
}

export interface ISetExistPersonVerCodeResponse {
	ver_id: number;
}

export const setExistPersonVerCodeRest = (code: string) => {
	const payload = {
		code,
	};

	return EnrollApi.post<ISetExistPersonVerCodeRequest, ISetExistPersonVerCodeResponse>(
		ENROLL_API_NAMES.SetNp,
		payload,
	);
};
