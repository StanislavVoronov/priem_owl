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
} from '$operations';

import { initAction, priemFilialsTransactionActions, transactionsSagas } from '$store';

const rootSagas = [
	...transactionsSagas,
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
