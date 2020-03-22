import { sagaEffects } from '@black_bird/utils';
import { navigateToStep, submitContactsFormAction } from '$store';

export const contactsFormSagas = [
	sagaEffects.takeEvery(submitContactsFormAction, function*() {
		yield sagaEffects.put(navigateToStep());
	}),
];
