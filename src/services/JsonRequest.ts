export class JsonRequest {
	host: string = '';
	path: string = '';
	body: any = '';

	constructor(host: string, path: string, api: string, payload: any, fileName?: string) {
		this.host = host;
		this.path = path;
		const body = new FormData();
		body.append('api', api);
		if (payload) {
			if (fileName) {
				body.append('values', payload, fileName);
			} else {
				body.append('values', JSON.stringify(payload));
			}
		}

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
