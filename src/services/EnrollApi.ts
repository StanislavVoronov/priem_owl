import { JsonRequest } from '@black_bird/utils';
import { ENROLL_API_NAMES } from './restApiNames';

class EnrollApi extends JsonRequest {
	public static host = '/dev-bin';
	public static path = '/priem_enroll_verify';

	static post = <Q, R>(api: ENROLL_API_NAMES, payload: Q): Promise<R> => {
		const Request = new JsonRequest(EnrollApi.host, EnrollApi.path, api, payload);

		return Request.post();
	};

	static select = <Q, R>(api: ENROLL_API_NAMES, payload: Q): Promise<R> => {
		const Request = new JsonRequest(EnrollApi.host, EnrollApi.path, api, payload);

		return Request.select();
	};
}

export default EnrollApi;
