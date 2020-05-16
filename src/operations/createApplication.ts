import { guid, sagaEffects } from '@black_bird/utils';
import {
	applicationsFormSelector,
	createAppTransactionActions,
	createPersonTransactionActions,
	IAdmGroup,
} from '$store';
export function* createNewPriemAppSaga() {
	const { applications } = yield sagaEffects.select(applicationsFormSelector);

	yield sagaEffects.all(
		applications.map((app: IAdmGroup, index: number) => {
			const key = guid();
			const flow = app.filial.ID === 1 ? 2 : 10;

			return sagaEffects.put(
				createAppTransactionActions.trigger(flow, app.admGroup, app.profile, index + 1, key),
			);
		}),
	);
}
export const createApplicationSagas = [
	sagaEffects.takeEvery(createPersonTransactionActions.success, createNewPriemAppSaga),
];
