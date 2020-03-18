import { ENROLL_API_NAMES } from './restApiNames';
import { JsonRequest } from './JsonRequest';

class EnrollApi extends JsonRequest {
	public static host = 'https://monitoring.mgutm.ru/dev-bin';
	public static path = '/priem_enroll_verify';

	static post = <Q, R>(api: ENROLL_API_NAMES, payload: Q): Promise<R> => {
		const Request = new JsonRequest(EnrollApi.host, EnrollApi.path, api, payload);

		return Request.post();
	};
}

export default EnrollApi;
