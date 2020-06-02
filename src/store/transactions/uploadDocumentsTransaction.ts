import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { createSelector, prop } from '@black_bird/utils';
import { AUTO_RETRY_REQUEST, IDocument, TRANSACTION_NAMES } from '$common';
import { uploadDocumentRest } from '$rests';
import { ITransactionsState } from '../transactionReducer';

export const uploadDocumentTransactionActions = createTransactionActions<
	string,
	{ document: IDocument; docKey: string }
>(TRANSACTION_NAMES.UploadDocument);

export const uploadDocumentsReducer = createTransactionReducer(uploadDocumentTransactionActions, {
	mapToKey: (payload) => payload.docKey,
});

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
