import { sagaEffects, isEmptyArray } from '@black_bird/utils';
import {
	checkLoginTransactionActions,
	regFormSelector,
	submitRegFormAction,
	createLoginTransactionActions,
	generateUserPasswordAction,
	findPersonTransactionActions,
	handleNextStep, isUniqueLoginTransactionSelector,
} from '$store';
import { checkLoginRest, createLoginRest, findPersonRest } from '$rests';
import { cyrillToLatin, generatePassword } from '$common';

function* createNewLogin() {
	const data = yield sagaEffects.select(regFormSelector);
	const lastName = cyrillToLatin(data.lastName);
	const firstName = cyrillToLatin(data.firstName);
	const middleName = cyrillToLatin(data.middleName);

	let firstPart = '';

	const firstNameList = Array.from(firstName);
	const secondNameList = Array.from(middleName);

	for (const first of firstNameList) {
		firstPart += first;
		let login = `${lastName}.${firstPart}.`;
		for (const second of secondNameList) {
			login += second;
			try {
				yield sagaEffects.put(checkLoginTransactionActions.request());

				const result = yield sagaEffects.call(checkLoginRest, login);

				yield sagaEffects.put(checkLoginTransactionActions.success(result));
			} catch (e) {
				yield sagaEffects.put(checkLoginTransactionActions.failure(e));
			}
			const isUniqueLogin = yield sagaEffects.select(isUniqueLoginTransactionSelector);

			if (isUniqueLogin.result) {
				yield sagaEffects.put(generateUserPasswordAction(login));

				return;
			}
		}
	}
}

export const regFormSagas = [
	sagaEffects.takeEvery(submitRegFormAction, createNewLogin),
	sagaEffects.rest(checkLoginTransactionActions, ({ payload }) => checkLoginRest(payload.login)),
	sagaEffects.rest(findPersonTransactionActions, ({ payload }) => findPersonRest(payload.data)),

	sagaEffects.takeLatest(generateUserPasswordAction, function*({ payload }: any) {
		const password = generatePassword();

		yield sagaEffects.put(createLoginTransactionActions.trigger(payload, password));
	}),
	sagaEffects.takeLatest(findPersonTransactionActions.success, function*({ payload }: any) {
		if (isEmptyArray(payload.response)) {
			yield sagaEffects.put(handleNextStep());
		}
	}),
	sagaEffects.rest(createLoginTransactionActions, ({ payload }) => {
		return createLoginRest(payload.login, payload.password);
	}),
	sagaEffects.takeEvery(createLoginTransactionActions.success, function*() {
		const data = yield sagaEffects.select(regFormSelector);

		yield sagaEffects.put(findPersonTransactionActions.trigger(data));
	}),
];
