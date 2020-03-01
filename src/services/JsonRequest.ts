export class JsonRequest {
	host: string = '';
	path: string = '';
	body: any = '';

	constructor(host: string, path: string, api: string, payload: any, extraData: any = {}) {
		this.host = host;
		this.path = path;
		const body = new FormData();
		body.append('api', api);
		if (payload) {
			body.append('values', JSON.stringify(payload));
		}
		Object.keys(extraData).forEach((key: string) => {
			body.append(key, extraData[key].value, extraData[key].name);
		});
		this.body = body;
	}
	post = (): any => {
		return fetch(`${this.host}${this.path}`, {
			method: 'POST',
			credentials: 'include',
			body: this.body,
		})
			.then(response => {
				return response.json();
			})
			.then((data: any) => {
				if (data.error) {
					throw new Error(data.error.string);
				}

				return Promise.resolve(data);
			});
	};
}
