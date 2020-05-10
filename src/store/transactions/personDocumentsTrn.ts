import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { IPersonDocument, TRANSACTION_NAMES } from '$common';
import { personDocumentsRest } from '$rests';
import { transactionSelector } from './selectors';

export const personDocumentsTrnActions = createTransactionActions(
	TRANSACTION_NAMES.PERSON_DOCUMENTS,
);

export const personDocumentsReducer = createTransactionReducer<IPersonDocument[]>(
	personDocumentsTrnActions,
);

export const personDocumentsTrnSelector = createSelector(transactionSelector, (state) => {
	return state.personDocuments;
});

export const personDocumentsSaga = sagaEffects.transaction(
	personDocumentsTrnActions,
	personDocumentsRest,
);
