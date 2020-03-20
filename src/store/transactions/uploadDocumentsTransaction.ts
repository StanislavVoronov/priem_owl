import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { createSelector, prop } from '@black_bird/utils';
import { IDocument } from '$common';
import { ITransactionsState } from './transactionsModels';
import { uploadDocumentRest } from '$rests';

export const uploadDocumentTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.UploadDocument,
	(document: IDocument, key: string) => ({
		key,
		document,
	}),
);

export const uploadDocumentsReducer = createTransactionReducer(uploadDocumentTransactionActions, {
	mapToKey: payload => payload.key,
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

export const uploadDocumentsSaga = sagaEffects.rest(uploadDocumentTransactionActions, ({ payload }) => {
	return uploadDocumentRest(payload.document);
});
