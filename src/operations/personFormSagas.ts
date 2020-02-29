import { sagaEffects } from '@black_bird/utils';
import { handleNextStep, submitPersonFormAction } from '$store';

export const personFormSagas = [
	sagaEffects.takeEvery(submitPersonFormAction, function*() {
		yield sagaEffects.put(handleNextStep());
	}),
];
