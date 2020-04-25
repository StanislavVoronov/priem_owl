import { sagaEffects } from '@black_bird/utils';
import { disabledFreePayFormAction, firstHighEducChanged } from '$store';

export const educationFormSagas = [
	sagaEffects.takeLatest(firstHighEducChanged, function* ({ payload }) {
		yield sagaEffects.put(disabledFreePayFormAction());
	}),
];
