import { sagaEffects } from '@black_bird/utils';
import {
	contactsFormSelector,
	createVerCodeTransactionActions,
	submitApplicationFormAction,
	verAccountFormSelector,
} from '$store';

export const verAccountFormSagas = [
	sagaEffects.takeEvery(submitApplicationFormAction, function* () {
		const { verAccountMethod } = yield sagaEffects.select(verAccountFormSelector);
		const { mobPhone, email } = yield sagaEffects.select(contactsFormSelector);

		yield sagaEffects.put(createVerCodeTransactionActions.trigger(email, mobPhone, verAccountMethod));
	}),
];
