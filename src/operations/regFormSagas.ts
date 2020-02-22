import { sagaEffects } from '@black_bird/utils';
import { checkLoginTransactionActions, regFormSelector, submitRegFormAction } from '$store';
import { checkLoginRest, createLoginRest } from '$rests';
import { createNewLoginAction, generatePassword } from '$common';

function* submitRegForm(values: any) {
	console.log('saga', values);
}

export const regFormSagas = [
	sagaEffects.takeEvery(submitRegFormAction, submitRegForm),
	sagaEffects.watcher(checkLoginTransactionActions, ({ payload }) => {
		return checkLoginRest(payload);
	}),
	sagaEffects.watcher(checkLoginTransactionActions, ({ payload }) => {
		const password = generatePassword();

		return createLoginRest(payload, password);
	}),
	sagaEffects.takeLatest(createNewLoginAction, function*() {
		const data = yield sagaEffects.select(regFormSelector);
		yield sagaEffects.call(createLoginRest, data);
	}),
];
