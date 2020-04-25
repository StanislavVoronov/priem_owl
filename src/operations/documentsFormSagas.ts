import { sagaEffects } from '@black_bird/utils';
import {
	closeLigotaPriemAction,
	documentsFormSelector,
	getLigotaDocument,
	openLigotaPriemAction,
	submitDocumentsFormAction,
} from '$store';
import { IDocument, IDocumentsForm } from '$common';

export function* checkLigotaPriemStatus() {
	const data: IDocument = yield sagaEffects.select(getLigotaDocument);

	if (data.cheatType) {
		yield sagaEffects.put(openLigotaPriemAction());
	} else {
		yield sagaEffects.put(closeLigotaPriemAction());
	}
}
export const documentsFormSagas = [
	sagaEffects.takeEvery(submitDocumentsFormAction, checkLigotaPriemStatus),
];
