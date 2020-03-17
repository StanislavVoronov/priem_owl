export class UploadDocument {
	host: string = '';
	path: string = '';
	body: any = '';

	constructor(host: string, path: string, api: string, payload: any, doc: File | null) {
		this.host = host;
		this.path = path;
		const body = new FormData();
		body.append('api', api);

		body.append('values', JSON.stringify(payload));

		if (doc) {
			const page = new Blob([doc], { type: doc.type });

			body.append('page', page);
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
