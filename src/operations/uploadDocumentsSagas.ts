import { sagaEffects } from '@black_bird/utils';
import { createPersonTransactionActions, documentsFormSelector, uploadDocumentTransactionActions } from '$store';
import { IDocument } from '$common';

export const uploadDocumentsSagas = [
	sagaEffects.takeEvery(createPersonTransactionActions.success, function*() {
		const { documents } = yield sagaEffects.select(documentsFormSelector);

		yield sagaEffects.all(
			documents.map((doc: IDocument) => {
				const id = [
					doc.type ? doc.type.id : '',
					doc.subType ? doc.subType.id : '',
					doc.series,
					doc.num,
				].join('-');

				return sagaEffects.put(uploadDocumentTransactionActions.trigger(doc, id));
			}),
		);
	}),
];
