import { IServerResponseResult } from '../common';
import { IPriemApiServerResponse } from '../containers/Enroll/ServerModels';
import { PriemApiName } from '../containers/Enroll/apiNames';

class PriemApi {
	public static host = 'https://monitoring.mgutm.ru/dev-bin';
	public static path = '/priem_api.fcgi';
	public static checkData = <Request, Response>(api: string, payload: Request): Promise<Response> => {
		const body = new FormData();
		body.append('api', api);
		body.append('values', JSON.stringify(payload));
		return fetch(`${PriemApi.host}${PriemApi.path}`, {
			method: 'POST',
			credentials: 'include',
			body,
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				return Promise.resolve(data.result[0]);
			});
	};
	public static post = <Request, Response>(api: PriemApiName, payload: Request): Promise<Response> => {
		const body = new FormData();
		body.append('api', api);
		body.append('values', JSON.stringify(payload));
		return fetch(`${PriemApi.host}${PriemApi.path}`, {
			method: 'POST',
			credentials: 'include',
			body,
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.error) {
					return Promise.reject({ message: data.error.string, type: data.error.id });
				}
				return Promise.resolve(data);
			});
	};
}

export default PriemApi;
