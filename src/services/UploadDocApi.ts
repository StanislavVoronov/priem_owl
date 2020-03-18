import { JsonRequest } from './JsonRequest';
import { isNull, omitBy } from '$common';

export class UploadDocApi extends JsonRequest {
	host: string = '';
	path: string = '';
	body: any = '';

	constructor(host: string, path: string, api: string, payload: any, doc: File | null) {
		super(host, path, api, payload);

		this.host = host;
		this.path = path;

		const body = new FormData();

		body.append('api', api);

		body.append('values', JSON.stringify(omitBy(payload, isNull)));

		if (doc) {
			body.append('page', doc);
		}

		this.body = body;
	}
}
