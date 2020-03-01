import { sagaEffects } from '@black_bird/utils';
import { handleNextStep, submitEducationFormAction } from '$store';

export const educationFormSagas = [
	sagaEffects.takeEvery(submitEducationFormAction, function*() {
		yield sagaEffects.put(handleNextStep());
	}),
];
