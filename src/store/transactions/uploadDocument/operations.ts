import { IDocument, IUploadDocRequest, uploadDocumentsActions } from '$common';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '$store';
import { Action } from 'redux';
import moment from 'moment';
import { omitBy, isNull } from '$common';
import { PriemApi, PriemRestApi } from '$services';

export const uploadDocumentTransaction = (doc: IDocument): ThunkAction<void, IRootState, void, Action> => dispatch => {
	const document: IUploadDocRequest = {
		mime: doc.docFile ? doc.docFile.type : null,
		type: doc.docType ? doc.docType.id : 0,
		stype: doc.docSubType ? doc.docSubType.id : null,
		seria: doc.docSeries ? doc.docSeries : '-',
		num: doc.docNumber ? doc.docNumber : '-',
		iss_org: doc.docIssieBy ? `${doc.docIssieBy}${doc.codeDepartment ? ' ' + doc.codeDepartment : ''}` : '-',
		iss_date: doc.docDate ? moment(doc.docDate).format('DD-MM-YYYY') : '01-01-1970',
		iss_gov: doc.docGovernment ? doc.docGovernment.id : 1,
	};
	const id = [
		doc.docType ? doc.docType.id : '',
		doc.docSubType ? doc.docSubType.id : '',
		doc.docSeries,
		doc.docNumber,
	].join('-');

	dispatch(uploadDocumentsActions.request(id));

	return PriemApi.post(PriemRestApi.AddDocuments, omitBy(document, isNull), {
		page: { value: doc.docFile, name: doc.docFile ? doc.docFile.name : '-' },
	})
		.then((response: any) => {
			console.log('successDocuments', response);
			dispatch(uploadDocumentsActions.success(id, [response]));

			return Promise.resolve();
		})
		.catch(error => {
			console.log('errorDocuments', error);
			// dispatch(uploadDocumentsActions.failure(id, error));

			return Promise.reject();
		});
};
