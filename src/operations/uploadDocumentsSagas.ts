import { sagaEffects, TransactionStatus } from '@black_bird/utils';
import {
	contactsFormSelector,
	createPersonTransactionActions,
	documentsFormSelector,
	educationFormSelector,
	personFormSelector,
	uploadDocumentsTransactionSelector,
	uploadDocumentTransactionActions,
} from '$store';
import { IDocument } from '$common';
import { updateCoolnessRest } from '$rests';

export const uploadDocumentsSagas = [
	sagaEffects.takeEvery(createPersonTransactionActions.success, function* () {
		const { documents } = yield sagaEffects.select(documentsFormSelector);
		const personForm = yield sagaEffects.select(personFormSelector);

		const educForm = yield sagaEffects.select(educationFormSelector);

		const { regDoc, liveDoc } = yield sagaEffects.select(contactsFormSelector);

		yield sagaEffects.all(
			[...documents, educForm.document, personForm.document, regDoc, liveDoc]
				.filter((item) => item && item.file !== null)
				.map((doc: IDocument) => {
					const id = [doc.type ? doc.type.id : '', doc.subType ? doc.subType.id : '', doc.series, doc.num].join('-');

					return sagaEffects.put(uploadDocumentTransactionActions.trigger(doc, id));
				}),
		);
	}),
	sagaEffects.takeEvery(uploadDocumentTransactionActions.success, function* () {
		const docsTransactions = sagaEffects.select(uploadDocumentsTransactionSelector);

		if (Object.values(docsTransactions).every((item) => item.status === TransactionStatus.COMPLETED)) {
			yield sagaEffects.call(updateCoolnessRest);
		}
	}),
];
