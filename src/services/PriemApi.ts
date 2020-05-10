import { JsonRequest, UploadFile } from '@black_bird/utils';
import { PRIEM_API_NAMES } from '$services';

class PriemApi {
	static host: string = '/dev-bin';
	static path: string = '/priem_api.fcgi';
	static select = <Q, R>(api: string, payload?: Q, errorMessage?: string): Promise<R[]> => {
		const Request = new JsonRequest(PriemApi.host, PriemApi.path, api, payload, errorMessage);

		return Request.select();
	};

	static post = <Q, R>(api: PRIEM_API_NAMES, payload?: Q, errorMessage?: string): Promise<R> => {
		const Request = new JsonRequest(PriemApi.host, PriemApi.path, api, payload, errorMessage);

		return Request.post();
	};
	static uploadDoc = <Q, R>(
		api: PRIEM_API_NAMES,
		payload: Q,
		doc: File | null = null,
	): Promise<R> => {
		const Request = new UploadFile(PriemApi.host, PriemApi.path, api, payload, doc);

		return Request.post();
	};
}

export default PriemApi;
