import { isNull, omitBy } from '$common';
import { retryFetch } from '@black_bird/utils';

export class JsonRequest {
	host: string = '';
	path: string = '';
	body: any = '';

	constructor(host: string, path: string, api: string, payload: any) {
		this.host = host;
		this.path = path;
		const body = new FormData();
		body.append('api', api);
		if (payload) {
			body.append('values', JSON.stringify(omitBy(payload, isNull)));
		}

		this.body = body;
	}
	select = (retry: number = 3): any => {
		return retryFetch(
			`${this.host}${this.path}`,
			{
				method: 'POST',
				credentials: 'include',
				body: this.body,
			},
			retry,
		)
			.then((response: any) => response.json())
			.then((data: any) => {
				if (data.error) {
					throw new Error(data.error.string);
				}

				return data.result;
			});
	};
	post = (retry: number = 3): any => {
		return retryFetch(
			`${this.host}${this.path}`,
			{
				method: 'POST',
				credentials: 'include',
				body: this.body,
			},
			retry,
		)
			.then((response: any) => response.json())
			.then((data: any) => {
				if (data.error) {
					throw new Error(data.error.string);
				}

				return data;
			});
	};
}
