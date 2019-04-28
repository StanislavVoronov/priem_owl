import { EnrollRestApi } from './restApiNames';

class PriemEnroll {
	public static host = 'https://monitoring.mgutm.ru/dev-bin';
	public static path = '/priem_enroll_verify';

	public static post = <Request, Response>(api: EnrollRestApi, payload: Request): Promise<Response> => {
		const body = new FormData();
		body.append('api', api);
		body.append('values', JSON.stringify(payload));

		return fetch(`${PriemEnroll.host}${PriemEnroll.path}`, {
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

export default PriemEnroll;
