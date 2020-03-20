import { sagaEffects } from '@black_bird/utils';
import {
	applicationsFormSelector,
	createAppTransactionActions,
	createPersonTransactionActions,
	IAdmGroup,
} from '$store';

export const createApplicationSagas = [
	sagaEffects.takeEvery(createPersonTransactionActions.success, function*() {
		const { applications } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.all(
			applications.map((app: IAdmGroup, index: number) => {
				const key = [app.admGroup.ID, app.profile].join('-');

				return sagaEffects.put(createAppTransactionActions.trigger(app.admGroup, app.profile, index, key));
			}),
		);
	}),
];
