import { sagaEffects } from '@black_bird/utils';
import { initAction, priemLogoutTransactionActions } from '$store';

export const priemLogoutSagas = [
	sagaEffects.takeEvery(initAction, function*() {
		yield sagaEffects.put(priemLogoutTransactionActions.trigger());
	}),
];
