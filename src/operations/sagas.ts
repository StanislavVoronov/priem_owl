import { regFormSagas } from './regForm';
import { sagaEffects } from '@black_bird/utils';
import { initAction } from '$store';
import { fetchClassifiersAction } from '@black_bird/dictionaries';
import { SHORT_DICTIONARY_LIST } from '../pages/Enroll/constants';

export const rootSagas = [
	...regFormSagas,
	sagaEffects.takeLatest(initAction, function*() {
		console.log('init');
		yield sagaEffects.put(
			fetchClassifiersAction({
				dictionaries: SHORT_DICTIONARY_LIST,
				url: '/dev-bin/priem_api.fcgi',
				version: 2,
			}),
		);
	}),
];
