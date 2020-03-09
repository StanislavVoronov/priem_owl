import { regFormSagas } from './regFormSagas';
import { personFormSagas } from './personFormSagas';
import { contactsFormSagas } from './contactsFormSagas';
import { educationFormSagas } from './educationFormSagas';
import { applicationFormSagas } from './applicationsFormSagas';
import { sagaEffects } from '@black_bird/utils';
import { initAction, transactionsSagas } from '$store';
import { fetchFullDictionaries, fetchShortDictionaries } from './dictionaries';

export const rootSagas = [
	...transactionsSagas,
	...regFormSagas,
	...personFormSagas,
	...contactsFormSagas,
	...educationFormSagas,
	...applicationFormSagas,
	sagaEffects.takeLatest(initAction, fetchShortDictionaries),
	sagaEffects.takeLatest(/*createLoginTransactionActions.success */ initAction, fetchFullDictionaries),
];
