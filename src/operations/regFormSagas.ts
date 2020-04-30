import { sagaEffects, isEmptyArray, guid } from '@black_bird/utils';
import {
	checkLoginTransactionActions,
	regFormSelector,
	submitRegFormAction,
	createLoginTransactionActions,
	generateUserPasswordAction,
	findPersonTransactionActions,
	navigateToStep,
	isUniqueLoginTransactionSelector,
	goToNextStep,
	verPersonTrnActions,
	isPersonFoundTransactionSelector,
	verPersonContactsTrnActions,
} from '$store';
import { checkLoginRest } from '$rests';
import { generatePassword } from '$common';
import { setExistPersonVerCodeTrnActions } from '$store';

function* createNewLogin() {
	let creatingNewLogin = true;

	do {
		const login = guid();

		try {
			yield sagaEffects.put(checkLoginTransactionActions.request());

			const result = yield sagaEffects.call(checkLoginRest, login);

			yield sagaEffects.put(checkLoginTransactionActions.success(result));

			const isUniqueLogin = yield sagaEffects.select(isUniqueLoginTransactionSelector);

			if (isUniqueLogin.result) {
				creatingNewLogin = false;

				yield sagaEffects.put(generateUserPasswordAction(login));
			}
		} catch (e) {
			yield sagaEffects.put(checkLoginTransactionActions.failure(e));
		}
	} while (creatingNewLogin);
}

export const regFormSagas = [
	sagaEffects.takeEvery(submitRegFormAction, function* ({ payload }) {
		if (payload.verAccountCode) {
			const data = yield sagaEffects.select(isPersonFoundTransactionSelector);

			yield sagaEffects.put(
				setExistPersonVerCodeTrnActions.trigger(data.result.ID, payload.verAccountCode),
			);
		} else {
			yield sagaEffects.call(createNewLogin);
		}
	}),
	sagaEffects.takeLatest(generateUserPasswordAction, function* ({ payload }: any) {
		const password = generatePassword();

		yield sagaEffects.put(createLoginTransactionActions.trigger(payload, password));
	}),
	sagaEffects.takeLatest(findPersonTransactionActions.success, function* ({ payload }: any) {
		console.log('payload', payload);
		if (isEmptyArray(payload.response)) {
			yield sagaEffects.put(goToNextStep());
		} else {
			const npId = yield sagaEffects.select(isPersonFoundTransactionSelector);

			yield sagaEffects.put(verPersonTrnActions.trigger(npId.result.ID));
			yield sagaEffects.put(verPersonContactsTrnActions.trigger(npId.result.ID));
		}
	}),
	sagaEffects.takeEvery(createLoginTransactionActions.success, function* () {
		const data = yield sagaEffects.select(regFormSelector);

		yield sagaEffects.put(findPersonTransactionActions.trigger(data));
	}),
	sagaEffects.takeEvery(setExistPersonVerCodeTrnActions.success, function* () {
		yield sagaEffects.put(goToNextStep());
	}),
];
