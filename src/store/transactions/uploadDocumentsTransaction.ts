import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector, prop } from '@black_bird/utils';
import { AUTO_RETRY_REQUEST, IDocument, TRANSACTION_NAMES } from '$common';
import { uploadDocumentRest } from '$rests';
import { ITransactionsState } from '../transactionReducer';

export const uploadDocumentTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.UploadDocument,
	(document: IDocument, docKey: string) => ({
		docKey,
		document,
	}),
);

export const uploadDocumentsReducer = createTransactionReducer<string, { docKey: string }>(
	uploadDocumentTransactionActions,
	{
		mapToKey: (payload) => payload.docKey,
	},
);

export const uploadDocumentsTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.uploadDocuments,
);

export const uploadDocumentTransactionSelector = createSelector(
	uploadDocumentsTransactionSelector,
	(_: any, id: string) => id,
	(state, id) => state[id],
);

export const uploadDocumentsSaga = sagaEffects.transaction(
	uploadDocumentTransactionActions,
	(payload) => uploadDocumentRest(payload.document),
	AUTO_RETRY_REQUEST,
);
