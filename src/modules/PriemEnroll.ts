import { IServerResponseResult } from '../common';

class PriemApi {
	public static host = 'https://monitoring.mgutm.ru/dev-bin';
	public static path = '/priem_enroll_verify';
	public static fetchData = <T>(api: string, payload?: any): Promise<T> => {
		const body = new FormData();
		body.append('values', JSON.stringify(payload));
		return fetch(`${PriemApi.host}${PriemApi.path}/${api}`, {
			method: 'POST',
			credentials: 'include',
			body,
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				return Promise.resolve(data);
			});
	};
}

export default PriemApi;
