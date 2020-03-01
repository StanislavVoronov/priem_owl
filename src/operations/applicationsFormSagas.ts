import { handleNextStep, priemFilialsTransactionActions, submitApplicationFormAction } from '$store';
import { sagaEffects } from '@black_bird/utils';
import { priemFilialsRest } from '$rests';

export const applicationFormSagas = [
	sagaEffects.rest(priemFilialsTransactionActions, () => {
		return priemFilialsRest();
	}),
	sagaEffects.takeEvery(submitApplicationFormAction, function*() {
		yield sagaEffects.put(handleNextStep());
	}),
];
