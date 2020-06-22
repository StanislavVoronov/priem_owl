import {
	guid,
	isEmptyArray,
	isVoid,
	ITransaction,
	not,
	sagaEffects,
	TransactionStatus,
} from '@black_bird/utils';
import {
	checkLoginTransactionActions,
	createLoginTransactionActions,
	findPersonTransactionActions,
	generateUserPasswordAction,
	getDocTypesDictionary,
	getEducTypeDocDictionary,
	getGovernmentDictionary,
	getPrevEducTypesDocDictionary,
	goToNextStep,
	initDocumentFormAction,
	initEducationFormAction,
	isPersonFoundTransactionSelector,
	isUniqueLoginTransactionSelector,
	navigateToStep,
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
import {
	generatePassword,
	IRemoteDocument,
	IPersonInfo,
	documentMapperLocal,
	IDictionary,
	anyPass,
} from '$common';

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
	const documents: ITransaction<IRemoteDocument[]> = yield sagaEffects.select(
		personDocumentsTrnSelector,
	);

	const prevEducDictionary = yield sagaEffects.select(getPrevEducTypesDocDictionary);
	const personInfo: ITransaction<IPersonInfo> = yield sagaEffects.select(personInfoTrnSelector);
	const docTypesDictionary = yield sagaEffects.select(getDocTypesDictionary);

	const educDocument = documents.result
		.map((doc) => {
			return documentMapperLocal(doc, docTypesDictionary);
		})
		.find((item) => item.type?.id === 2);

	const otherDocuments = documents.result.filter((item) =>
		not(anyPass([() => item.TYPE === 1, () => item.TYPE === 2, () => item.TYPE === 3])),
	);

	yield sagaEffects.put(
		initDocumentFormAction(
			otherDocuments.map((item) => documentMapperLocal(item, docTypesDictionary)),
		),
	);

	console.log('personInfo', personInfo);
	console.log('documents', documents);

	if (educDocument) {
		yield sagaEffects.put(
			initEducationFormAction({
				document: educDocument,
				firstHighEducation: personInfo.result.HIGH_FIRST === 1,
				prevEducation:
					prevEducDictionary.result.find(
						(item: IDictionary) => item.id === personInfo.result.BEST_PREV_EDU,
					) || null,
			}),
		);
	}

	yield sagaEffects.put(navigateToStep(3));
}
export const regFormSagas = [
	sagaEffects.takeEvery(submitRegFormAction, function* ({ payload }) {
		if (payload.verAccountCode) {
			const data = yield sagaEffects.select(isPersonFoundTransactionSelector);

			yield sagaEffects.put(
				setExistPersonVerCodeTrnActions.trigger({
					npId: data.result.ID,
					code: payload.verAccountCode,
				}),
			);
		} else {
			yield sagaEffects.call(createNewLogin);
		}
	}),
	sagaEffects.takeLatest(generateUserPasswordAction, function* ({ payload }: any) {
		const password = generatePassword();

		yield sagaEffects.put(createLoginTransactionActions.trigger({ login: payload, password }));
	}),
	sagaEffects.takeLatest(findPersonTransactionActions.success, function* ({ payload }: any) {
		if (isVoid(payload.response)) {
			yield sagaEffects.put(goToNextStep());
		} else {
			const npId: ITransaction<{ ID: number }> = yield sagaEffects.select(
				isPersonFoundTransactionSelector,
			);

			yield sagaEffects.put(verPersonTrnActions.trigger({ npId: npId.result.ID }));

			yield sagaEffects.put(verPersonContactsTrnActions.trigger({ npId: npId.result.ID }));
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
		}
	}),
	sagaEffects.takeEvery(personInfoTrnActions.success, function* () {
		const documents: ITransaction<IRemoteDocument[]> = yield sagaEffects.select(
			personDocumentsTrnSelector,
		);

		if (documents.status === TransactionStatus.COMPLETED) {
			yield setPersonData();
		}
	}),
];
