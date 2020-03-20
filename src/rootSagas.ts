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
	createApplicationSagas
} from '$operations';

import { initAction, priemFilialsTransactionActions, transactionsSagas } from '$store';

const rootSagas = [
	...createApplicationSagas,
	...uploadDocumentsSagas,
	...createPersonContactsSagas,
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
	sagaEffects.takeEvery(initAction, function*() {
		yield sagaEffects.put(priemFilialsTransactionActions.trigger());
	}),

	sagaEffects.takeLatest(/*createLoginTransactionActions.success */ initAction, fetchFullDictionaries),
];

export default rootSagas;
