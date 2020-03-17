import { JsonRequest } from './JsonRequest';
import { isNull, omitBy } from '$common';

export class UploadDocApi extends JsonRequest {
	host: string = '';
	path: string = '';
	body: any = '';

	constructor(host: string, path: string, api: string, payload: any, doc: File | null) {
		super(host, path, api, payload);

		const body = new FormData();
		body.append('api', api);

		body.append('values', JSON.stringify(omitBy(payload, isNull)));

		if (doc) {
			const page = new Blob([doc], { type: doc.type });

			body.append('page', page);
		}

		this.body = body;
	}
}
