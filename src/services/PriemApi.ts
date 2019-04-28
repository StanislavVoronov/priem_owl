import { IServerResponseResult } from '../common';
import { IPriemApiServerResponse } from '../containers/Enroll/serverModels';
import { PriemRestApi } from './restApiNames';
import { JsonRequest } from './JsonRequest';

interface IPriemApiResponse {
	result: any[];
	error: any;
}
class PriemApi {
	static root: string = '/dev-bin';
	static path: string = '/priem_api.fcgi';
	static checkData = <Q, R>(api: string, payload: Q, extraData: object = {}): Promise<R> => {
		const Request = new JsonRequest(PriemApi.root, PriemApi.path, api, payload, extraData);

		return Request.send<IPriemApiResponse>().then(response => {
			return Promise.resolve(response.result[0]);
		});
	};
	static post = <Q, R>(api: PriemRestApi, payload: Q, extraData: object = {}): Promise<any> => {
		const Request = new JsonRequest(PriemApi.root, PriemApi.path, api, payload, extraData);

		return Request.send<IPriemApiResponse>().then(response => {
			if (response.error) {
				return Promise.reject({ message: response.error.string, type: response.error.id });
			}

			return Promise.resolve(response);
		});
	};
}

export default PriemApi;
