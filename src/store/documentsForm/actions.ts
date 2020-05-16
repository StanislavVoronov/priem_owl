import { IDocument, IDocumentsForm } from '$common';
import { createAction } from '@black_bird/utils';

const NAMESPACE = 'DOCUMENTS_FORM';

export const submitDocumentsFormAction = createAction(
	`${NAMESPACE}/SUBMIT`,
	(documents: IDocument[]) => documents,
);
export const admNeedDocChangedStatusAction = createAction(
	`${NAMESPACE}/NEED_ADM_DOC`,
	(status: boolean) => status,
);
export const newDocumentAdded = createAction(`${NAMESPACE}/NEW_DOC_ADDED`, (doc: IDocument) => doc);
export const initDocumentFormAction = createAction(
	`${NAMESPACE}/INIT_DOC_FORM`,
	(documents: IDocument[]) => documents,
);
