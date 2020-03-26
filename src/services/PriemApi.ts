import { PRIEM_API_NAMES } from '$services';
import { isNull, omitBy } from '$common';
import { JsonRequest } from './JsonRequest';
import { UploadDocApi } from './UploadDocApi';

class PriemApi {
	static host: string = '/dev-bin';
	static path: string = '/priem_api.fcgi';
	static select = <Q, R>(api: string, payload?: Q): Promise<R[]> => {
		const Request = new JsonRequest(PriemApi.host, PriemApi.path, api, payload);

		return Request.post().then((item: any) => Promise.resolve(item.result));
	};

	static post = <Q, R>(api: PRIEM_API_NAMES, payload: Q): Promise<R> => {
		const Request = new JsonRequest(PriemApi.host, PriemApi.path, api, payload);

		return Request.post();
	};
	static uploadDoc = <Q, R>(api: PRIEM_API_NAMES, payload: Q, doc: File | null = null): Promise<R> => {
		const Request = new UploadDocApi(PriemApi.host, PriemApi.path, api, payload, doc);

		return Request.post();
	};
}

export default PriemApi;
