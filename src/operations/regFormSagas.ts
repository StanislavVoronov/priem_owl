import {
	guid,
	isEmptyArray,
	ITransaction,
	sagaEffects,
	TransactionStatus,
} from '@black_bird/utils';
import {
	checkLoginTransactionActions,
	createLoginTransactionActions,
	findPersonTransactionActions,
	generateUserPasswordAction,
	goToNextStep,
	isPersonFoundTransactionSelector,
	isUniqueLoginTransactionSelector,
	personDocumentsTrnActions,
	personDocumentsTrnSelector,
	personInfoTrnActions,
	personInfoTrnSelector,
	regFormSelector,
	setExistPersonVerCodeTrnActions,
	submitRegFormAction,
	verPersonContactsTrnActions,
	verPersonTrnActions,
} from '$store';
import { checkLoginRest } from '$rests';
import { generatePassword, IPersonDocument, IPersonInfo } from '$common';

function* createNewLogin(): any {
	const login = guid();

	try {
		yield sagaEffects.put(checkLoginTransactionActions.request());

		const result = yield sagaEffects.call(checkLoginRest, login);

		yield sagaEffects.put(checkLoginTransactionActions.success(result));

		const isUniqueLogin = yield sagaEffects.select(isUniqueLoginTransactionSelector);

		if (isUniqueLogin.result) {
			yield sagaEffects.put(generateUserPasswordAction(login));
		} else {
			yield sagaEffects.call(createNewLogin);
		}
	} catch (e) {
		yield sagaEffects.put(checkLoginTransactionActions.failure(e));
	}
}

function* setPersonData() {
	const documents: ITransaction<IPersonDocument[]> = yield sagaEffects.select(
		personDocumentsTrnSelector,
	);
	const personInfo: ITransaction<IPersonInfo> = yield sagaEffects.select(personInfoTrnSelector);

	console.log('documents', documents);
	console.log('personInfo', personInfo);
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
		yield sagaEffects.put(personInfoTrnActions.trigger());
		yield sagaEffects.put(personDocumentsTrnActions.trigger());
	}),
	sagaEffects.takeEvery(personDocumentsTrnActions.success, function* () {
		const personInfo: ITransaction<any> = yield sagaEffects.select(personInfoTrnSelector);
		if (personInfo.status === TransactionStatus.COMPLETED) {
			yield setPersonData();
			yield sagaEffects.put(goToNextStep());
		}
	}),
	sagaEffects.takeEvery(personInfoTrnActions.success, function* () {
		const documents: ITransaction<IPersonDocument[]> = yield sagaEffects.select(
			personDocumentsTrnSelector,
		);

		if (documents.status === TransactionStatus.COMPLETED) {
			yield setPersonData();
			yield sagaEffects.put(goToNextStep());
		}
	}),
];
