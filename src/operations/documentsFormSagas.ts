import { sagaEffects } from '@black_bird/utils';
import {
	contactsFormSelector,
	createVerCodeTransactionActions,
	handleNextStep,
	submitDocumentsForm,
	verAccountFormSelector,
} from '$store';

export const documentsFormSagas = [
	sagaEffects.takeEvery(submitDocumentsForm, function*() {
		const { verAccountMethod } = yield sagaEffects.select(verAccountFormSelector);
		const { mobPhone, email } = yield sagaEffects.select(contactsFormSelector);

		yield sagaEffects.put(createVerCodeTransactionActions.trigger(email, mobPhone, verAccountMethod));

		yield sagaEffects.put(handleNextStep());
	}),
];
