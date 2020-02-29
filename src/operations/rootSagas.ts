import { regFormSagas } from './regFormSagas';
import { personFormSagas } from './personFormSagas';
import { sagaEffects } from '@black_bird/utils';
import { createLoginTransactionActions, initAction } from '$store';
import { fetchClassifiersAction } from '@black_bird/dictionaries';
import { FULL_DICTIONARY_LIST, SHORT_DICTIONARY_LIST } from '../dictionaries';

function* fetchShortDictionaries() {
	yield sagaEffects.put(
		fetchClassifiersAction({
			dictionaries: SHORT_DICTIONARY_LIST,
			url: '/dev-bin/priem_api.fcgi',
			version: 2,
		}),
	);
}

function* fetchFullDictionaries() {
	yield sagaEffects.put(
		fetchClassifiersAction({
			dictionaries: FULL_DICTIONARY_LIST,
			url: '/dev-bin/priem_api.fcgi',
			version: 2,
		}),
	);
}

export const rootSagas = [
	...regFormSagas,
	...personFormSagas,
	sagaEffects.takeLatest(initAction, fetchShortDictionaries),
	sagaEffects.takeLatest(/*createLoginTransactionActions.success */ initAction, fetchFullDictionaries),
];
