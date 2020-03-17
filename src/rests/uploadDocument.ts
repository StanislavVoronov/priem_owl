import { IDocument, IUploadDocRequest, uploadDocumentsActions } from '$common';

import moment from 'moment';
import { PriemApi, PRIEM_API_NAMES } from '$services';

export const uploadDocumentRest = (doc: IDocument) => {
	const document: IUploadDocRequest = {
		mime: doc.file ? doc.file.type : 'image/jpeg',
		type: doc.type ? doc.type.id : 0,
		stype: doc.subType ? doc.subType.id : null,
		seria: doc.series || '-',
		num: doc.num || '-',
		iss_org: doc.issieBy ? `${doc.issieBy}${doc.codeDepartment ? ' ' + doc.codeDepartment : ''}` : '-',
		iss_date: doc.date ? moment(doc.docDate).format('DD-MM-YYYY') : '01-01-1970',
		iss_gov: doc.government ? doc.government.id : 1,
	};

	return PriemApi.uploadDoc(PRIEM_API_NAMES.AddDocuments, document, doc.file);
};
