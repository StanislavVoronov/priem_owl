import { sagaEffects } from '@black_bird/utils';
import { handleNextStep, submitContactsFormAction } from '$store';

export const contactsFormSagas = [
	sagaEffects.takeEvery(submitContactsFormAction, function*() {
		yield sagaEffects.put(handleNextStep());
	}),
];
