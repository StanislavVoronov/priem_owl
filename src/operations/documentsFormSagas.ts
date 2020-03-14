import { sagaEffects } from '@black_bird/utils';
import { handleNextStep, submitDocumentsForm } from '$store';

export const documentsFormSagas = [
	sagaEffects.takeEvery(submitDocumentsForm, function*() {
		yield sagaEffects.put(handleNextStep());
	}),
];
