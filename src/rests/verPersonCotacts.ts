import { ENROLL_API_NAMES, EnrollApi } from '$services';

export interface IVerPersonContactsRequest {
	np_uid: number;
}

export interface IVerPersonContactsResponse {
	email: string;
	phones: [{ phone: string; type: string }];
}

export const verPersonContactsRest = (npId: number) => {
	const payload = {
		np_uid: npId,
	};

	return EnrollApi.select<IVerPersonContactsRequest, IVerPersonContactsResponse>(
		ENROLL_API_NAMES.VerPersonContacts,
		payload,
	);
};
