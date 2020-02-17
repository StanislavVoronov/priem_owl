import { sagaEffects } from '@black_bird/utils';
import { submitRegFormAction } from '$store';

function* submitRegForm(values: any) {
	console.log('saga', values);
}

export const regFormSagas = [sagaEffects.takeEvery(submitRegFormAction, submitRegForm)];
