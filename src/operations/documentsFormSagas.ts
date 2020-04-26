import { sagaEffects } from '@black_bird/utils';
import {
	closeLigotaPriemAction,
	documentsFormSelector,
	getLigotaDocument,
	openLigotaPriemAction,
	submitDocumentsFormAction,
} from '$store';
import { IDocument } from '$common';

export function* checkLigotaPriemStatus() {
	const data: IDocument | undefined = yield sagaEffects.select(getLigotaDocument);

	if (data && data.cheatType) {
		yield sagaEffects.put(openLigotaPriemAction());
	} else {
		yield sagaEffects.put(closeLigotaPriemAction());
	}
}
export const documentsFormSagas = [
	sagaEffects.takeEvery(submitDocumentsFormAction, checkLigotaPriemStatus),
];
