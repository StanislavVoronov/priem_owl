import { sagaEffects } from '@black_bird/utils';
import {
	contactsFormSelector,
	createPersonTransactionActions,
	documentsFormSelector,
	educationFormSelector,
	personFormSelector,
	uploadDocumentTransactionActions,
} from '$store';
import { IDocument } from '$common';

export const uploadDocumentsSagas = [
	sagaEffects.takeEvery(createPersonTransactionActions.success, function*() {
		const { documents } = yield sagaEffects.select(documentsFormSelector);
		const personForm = yield sagaEffects.select(personFormSelector);

		const educForm = yield sagaEffects.select(educationFormSelector);

		const { regDoc, liveDoc } = yield sagaEffects.select(contactsFormSelector);

		yield sagaEffects.all(
			[...documents, educForm.document, personForm.documet, regDoc, liveDoc].filter(Boolean).map((doc: IDocument) => {
				const id = [doc.type ? doc.type.id : '', doc.subType ? doc.subType.id : '', doc.series, doc.num].join('-');

				return sagaEffects.put(uploadDocumentTransactionActions.trigger(doc, id));
			}),
		);
	}),
];
