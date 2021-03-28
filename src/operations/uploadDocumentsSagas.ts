import { guid, isVoid, ITransaction, sagaEffects, TransactionStatus } from '@black_bird/utils';
import {
	contactsFormSelector,
	createPersonTransactionActions,
	documentsFormSelector,
	educationFormSelector,
	personDocumentsTrnSelector,
	personFormSelector, uploadDocumentAction,
	uploadDocumentsTransactionSelector,
	uploadDocumentTransactionActions,
} from '$store';
import { IDocument, IPersonForm, IRemoteDocument } from '$common';
import { updateCoolnessRest } from '$rests';
export function* uploadDocumentsSaga() {
	const { documents } = yield sagaEffects.select(documentsFormSelector);
	const personForm: IPersonForm = yield sagaEffects.select(personFormSelector);
	const personDocuments: ITransaction<IRemoteDocument[]> = yield sagaEffects.select(
		personDocumentsTrnSelector,
	);
	const educForm = yield sagaEffects.select(educationFormSelector);

	const defaultEducDocument = Array.isArray(personDocuments.result)
		? personDocuments.result.find((item) => item?.TYPE === 2)
		: void 0;

	const defaultPersonDocument = Array.isArray(personDocuments)
		? personDocuments.result.find((item) => item?.TYPE === 1)
		: void 0;

	if (
		isVoid(defaultPersonDocument) ||
		defaultPersonDocument?.SERIA !== personForm?.document.series
	) {
		yield sagaEffects.put(
			uploadDocumentTransactionActions.trigger({ document: personForm.document, docKey: guid() }),
		);
	}

	if (isVoid(defaultEducDocument) || defaultEducDocument?.SERIA !== educForm?.document.series) {
		yield sagaEffects.put(
			uploadDocumentTransactionActions.trigger({ document: educForm.document, docKey: guid() }),
		);
	}

	const { regDoc, liveDoc } = yield sagaEffects.select(contactsFormSelector);

	yield sagaEffects.all(
		[...documents, regDoc, liveDoc]
			.filter((item) => item && item.file !== null)
			.map((doc: IDocument) => {
				return sagaEffects.put(
					uploadDocumentTransactionActions.trigger({ document: doc, docKey: guid() }),
				);
			}),
	);
}
export const uploadDocumentsSagas = [
	sagaEffects.takeLatest(uploadDocumentAction, function*({payload}) {
		yield sagaEffects.put(
			uploadDocumentTransactionActions.trigger({ document: { file: payload }, docKey: guid() }),
		);
	}),
	sagaEffects.takeEvery(createPersonTransactionActions.success, uploadDocumentsSaga),
	sagaEffects.takeEvery(uploadDocumentTransactionActions.success, function* () {
		const docsTransactions = sagaEffects.select(uploadDocumentsTransactionSelector);

		if (
			Object.values(docsTransactions).every((item) => item.status === TransactionStatus.COMPLETED)
		) {
			yield sagaEffects.call(updateCoolnessRest);
		}
	}),
];
