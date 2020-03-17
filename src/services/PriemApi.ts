import { PriemRestApi } from '$services';
import { isNull, omitBy } from '$common';
import { JsonRequest } from './JsonRequest';
import { UploadDocument } from './UploadDocument';

class PriemApi {
	static root: string = '/dev-bin';
	static path: string = '/priem_api.fcgi';
	static check = <Q, R>(api: string, payload: Q, extraData: object = {}): Promise<R[]> => {
		const Request = new JsonRequest(PriemApi.root, PriemApi.path, api, payload);

		return Request.post().then((response: { result: R[] }) => Promise.resolve(response.result));
	};
	static select = <Q, R>(api: string, payload?: Q): Promise<R[]> => {
		const Request = new JsonRequest(PriemApi.root, PriemApi.path, api, payload);

		return Request.post().then((response: { result: R[] }) => Promise.resolve(response.result));
	};
	static post = <Q, R>(api: PriemRestApi, payload: Q): Promise<R> => {
		const Request = new JsonRequest(PriemApi.root, PriemApi.path, api, omitBy(payload, isNull));

		return Request.post();
	};
	static uploadDoc = <Q, R>(api: PriemRestApi, payload: Q, doc: File | null = null): Promise<R> => {
		const Request = new UploadDocument(PriemApi.root, PriemApi.path, api, omitBy(payload, isNull), doc);

		return Request.post();
	};
}

export default PriemApi;
