import { sagaEffects } from '@black_bird/utils';
import { fetchClassifiersAction } from '@black_bird/dictionaries';
import { FULL_DICTIONARY_LIST, SHORT_DICTIONARY_LIST } from '../dictionaries';

export function* fetchShortDictionaries() {
	yield sagaEffects.put(
		fetchClassifiersAction({
			dictionaries: SHORT_DICTIONARY_LIST,
			url: '/dev-bin/priem_api.fcgi',
			version: 2,
		}),
	);
}

export function* fetchFullDictionaries() {
	yield sagaEffects.put(
		fetchClassifiersAction({
			dictionaries: FULL_DICTIONARY_LIST,
			url: '/dev-bin/priem_api.fcgi',
			version: 2,
		}),
	);
}