import { ifElse, sagaEffects } from '@black_bird/utils';
import { disabledPayFormsUpdated, firstHighEducChanged } from '$store';

export const educationFormSagas = [
	sagaEffects.takeLatest(firstHighEducChanged, function* ({ payload }) {
		console.log('value', payload);
		const disabledPayForms = [16, 20];

		if (payload) {
			disabledPayForms.push(14);
		}

		yield sagaEffects.put(disabledPayFormsUpdated(disabledPayForms));
	}),
];
