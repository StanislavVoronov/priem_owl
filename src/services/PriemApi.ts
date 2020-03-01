import { JsonRequest, PriemRestApi } from '$services';

interface IPriemApiResponse<R> {
	result: R;
	error: any;
}
class PriemApi {
	static root: string = '/dev-bin';
	static path: string = '/priem_api.fcgi';
	static check = <Q, R>(api: string, payload: Q, extraData: object = {}): Promise<R[]> => {
		const Request = new JsonRequest(PriemApi.root, PriemApi.path, api, payload, extraData);

		return Request.post().then((response: { result: R[] }) => Promise.resolve(response.result));
	};
	static select = <Q, R>(api: string, payload?: Q): Promise<R[]> => {
		const Request = new JsonRequest(PriemApi.root, PriemApi.path, api, payload);

		return Request.post().then((response: { result: R[] }) => Promise.resolve(response.result));
	};
	static post = <Q, R>(api: PriemRestApi, payload: Q, extraData: object = {}): Promise<R> => {
		const Request = new JsonRequest(PriemApi.root, PriemApi.path, api, payload, extraData);

		return Request.post();
	};
}

export default PriemApi;
