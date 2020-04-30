import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector, prop } from '@black_bird/utils';
import { AUTO_REQUEST_RETRY, IDocument, TRANSACTION_NAMES } from '$common';
import { ITransactionsState } from './transactionsModels';
import { uploadDocumentRest } from '$rests';

export const uploadDocumentTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.UploadDocument,
	(document: IDocument, docKey: string) => ({
		docKey,
		document,
	}),
);

export const uploadDocumentsReducer = createTransactionReducer(uploadDocumentTransactionActions, {
	mapToKey: (payload) => payload.docKey,
});

export const uploadDocumentTransactionSelector = createSelector(
	prop('transactions'),
	(_: any, id: string) => id,
	(state: ITransactionsState, id) => state.uploadDocuments[id],
);

export const uploadDocumentsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.uploadDocuments,
);

export const uploadDocumentsSaga = sagaEffects.rest(
	uploadDocumentTransactionActions,
	({ payload }) => uploadDocumentRest(payload.document),
	{
		autoRetry: AUTO_REQUEST_RETRY,
	},
);
