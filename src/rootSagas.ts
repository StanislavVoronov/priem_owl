import { sagaEffects } from '@black_bird/utils';
import { classifiersSagas } from '@black_bird/dictionaries';
import { contactsFormSagas } from './operations/contactsFormSagas';
import {
	applicationFormSagas,
	educationFormSagas,
	personFormSagas,
	fetchFullDictionaries,
	fetchShortDictionaries,
	regFormSagas,
	createNewFolderSagas,
	documentsFormSagas,
	verAccountFormSagas,
	createPersonContactsSagas,
	uploadDocumentsSagas,
	createApplicationSagas,
	priemLogoutSagas,
} from '$operations';

import {
	createLoginTransactionActions,
	findPersonTransactionActions,
	initAction,
	isPersonFoundTransactionSelector,
	priemFilialsTransactionActions,
	transactionsSagas,
} from '$store';

const rootSagas = [
	...priemLogoutSagas,
	...createApplicationSagas,
	...uploadDocumentsSagas,
	...createPersonContactsSagas,
	...createNewFolderSagas,
	...verAccountFormSagas,
	...transactionsSagas,
	...documentsFormSagas,
	...regFormSagas,
	...personFormSagas,
	...contactsFormSagas,
	...educationFormSagas,
	...applicationFormSagas,
	...classifiersSagas,
	sagaEffects.takeEvery(initAction, fetchShortDictionaries),
	sagaEffects.takeLatest(findPersonTransactionActions.success, function* () {
		const { result } = yield sagaEffects.select(isPersonFoundTransactionSelector);

		if (!result) {
			yield fetchFullDictionaries();
			yield sagaEffects.put(priemFilialsTransactionActions.trigger());
		}
	}),
];

export default rootSagas;
