import { JsonRequest, PriemRestApi } from '$services';

interface IPriemApiResponse<R> {
	result: R;
	error: any;
}
class PriemApi {
	static root: string = '/dev-bin';
	static path: string = '/priem_api.fcgi';
	static checkData = <Q, R>(api: string, payload: Q, extraData: object = {}): Promise<R[]> => {
		const Request = new JsonRequest(PriemApi.root, PriemApi.path, api, payload, extraData);

		return Request.send<IPriemApiResponse<R[]>>().then(response => {
			return Promise.resolve(response.result);
		});
	};
	static post = <Q, R>(api: PriemRestApi, payload: Q, extraData: object = {}): Promise<R> => {
		const Request = new JsonRequest(PriemApi.root, PriemApi.path, api, payload, extraData);

		return Request.send<IPriemApiResponse<R>>().then(response => {
			if (response.error) {
				return Promise.reject({ message: response.error.string, type: response.error.id });
			}

			return Promise.resolve(response.result);
		});
	};
}

export default PriemApi;
