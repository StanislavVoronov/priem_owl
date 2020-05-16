import { sagaEffects } from '@black_bird/utils';
import { classifiersSagas, fetchClassifiersAction } from '@black_bird/dictionaries';
import { contactsFormSagas } from './operations/contactsFormSagas';
import {
	applicationFormSagas,
	educationFormSagas,
	personFormSagas,
	regFormSagas,
	createNewFolderSagas,
	documentsFormSagas,
	verAccountFormSagas,
	createPersonContactsSagas,
	uploadDocumentsSagas,
	createApplicationSagas,
} from '$operations';

import {
	findPersonTransactionActions,
	initAction,
	isPersonFoundTransactionSelector,
	priemLogoutTransactionActions,
	transactionsSagas,
	verPersonContactsTrnActions,
} from '$store';
import { FULL_DICTIONARY_LIST, SHORT_DICTIONARY_LIST } from './dictionaries';

const rootSagas = [
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
	sagaEffects.takeLatest(initAction, function* () {
		yield sagaEffects.put(priemLogoutTransactionActions.trigger());

		yield sagaEffects.put(
			fetchClassifiersAction({
				dictionaries: SHORT_DICTIONARY_LIST,
				url: '/dev-bin/priem_api.fcgi',
				version: 2,
			}),
		);
	}),
	sagaEffects.takeLatest(findPersonTransactionActions.success, function* () {
		const { result } = yield sagaEffects.select(isPersonFoundTransactionSelector);

		if (!result) {
			yield sagaEffects.put(
				fetchClassifiersAction({
					dictionaries: FULL_DICTIONARY_LIST,
					url: '/dev-bin/priem_api.fcgi',
					version: 2,
				}),
			);
		}
	}),
	sagaEffects.takeLatest(verPersonContactsTrnActions.success, function* () {
		yield sagaEffects.put(
			fetchClassifiersAction({
				dictionaries: FULL_DICTIONARY_LIST,
				url: '/dev-bin/priem_api.fcgi',
				version: 2,
			}),
		);
	}),
];

export default rootSagas;
