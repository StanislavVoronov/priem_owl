export class JsonRequest {
	host: string = '';
	path: string = '';
	body: any = '';

	constructor(host: string, path: string, api: string, payload: any, extraData: any) {
		this.host = host;
		this.path = path;
		const body = new FormData();
		body.append('api', api);
		body.append('values', JSON.stringify(payload));
		Object.keys(extraData).forEach((key: string) => {
			console.log('key', extraData);
			body.append(key, extraData[key].value, extraData[key].name);
		});
		this.body = body;
	}
	send = <T>(): Promise<T> => {
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
					return Promise.reject({ message: data.error.string, type: data.error.id });
				}

				return data;
			});
	};
}
