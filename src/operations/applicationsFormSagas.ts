import {
	applicationsFormSelector,
	cleanDefaultAdmTypeAction,
	newAdmGroupsAddedAction,
	newFetchPriemAppSuccessAction,
	newPriemAppAddedAction,
	onChangeAdmTypeAction,
	onChangeDirectionAction,
	onChangeEducFormsAction,
	onChangeEducLevelAction,
	onChangeFilialAction,
	onChangeInstAction, onChangePayFormsAction,
	onChangeProfilesAction,
	priemAdmGroupsTransactionActions,
	priemAdmGroupsTrnSelector,
	priemAdmTypesTrnActions,
	priemDirectionsTrnActions,
	priemEducFormsTransactionActions,
	priemEducLevelsTrnActions,
	priemInstitutesTrnActions,
	priemPayFormsTransactionActions,
	priemProfilesTransactionActions,
} from '$store';
import { guid, ITransaction, sagaEffects, TransactionStatus } from '@black_bird/utils';
import { IPriemGroup, SPO_EDU_LEVEL_ID } from '$common';

export const applicationFormSagas = [
	sagaEffects.takeEvery(onChangeFilialAction, function* () {
		const { filial } = yield sagaEffects.select(applicationsFormSelector);

		if (filial) {
			yield sagaEffects.put(priemEducLevelsTrnActions.trigger(filial));
		}
	}),
	sagaEffects.takeEvery(onChangeInstAction, function* () {
		const { filial, institute, educLevel } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(
			priemDirectionsTrnActions.trigger({ filial, educLevel, inst: institute }),
		);
	}),
	sagaEffects.takeEvery(onChangeEducLevelAction, function* () {
		const { filial, educLevel } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(priemInstitutesTrnActions.trigger({ filial, eduLevel: educLevel }));
	}),
	sagaEffects.takeEvery(onChangeDirectionAction, function* () {
		const { filial, institute, direction } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(
			priemProfilesTransactionActions.trigger({ filial, inst: institute, direction }),
		);
	}),
	sagaEffects.takeEvery(onChangeProfilesAction, function* () {
		const { filial, institute, direction } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(
			priemEducFormsTransactionActions.trigger({ filial, inst: institute, direction }),
		);
	}),
	sagaEffects.takeEvery(onChangeEducFormsAction, function* () {
		const { filial, institute, direction, educForms } = yield sagaEffects.select(
			applicationsFormSelector,
		);

		yield sagaEffects.put(
			priemPayFormsTransactionActions.trigger({ filial, inst: institute, direction, educForms }),
		);
	}),
	sagaEffects.takeEvery(onChangePayFormsAction, function* () {
		const { filial, institute, direction, educForms, payForms, educLevel } = yield sagaEffects.select(
			applicationsFormSelector,
		);

		yield sagaEffects.put(
			priemAdmTypesTrnActions.trigger({ filial, institute, direction, eduLevel: educLevel, educForms, payForms }),
		);
	}),
	sagaEffects.takeEvery(newPriemAppAddedAction, function* () {
		const { filial, institute, direction, payForms, educForms, admType } = yield sagaEffects.select(
			applicationsFormSelector,
		);

		for (const educ of educForms) {
			for (const pay of payForms) {
				yield sagaEffects.put(
					priemAdmGroupsTransactionActions.trigger({
						filial,
						inst: institute,
						direction,
						educForm: educ,
						payForm: pay,
						admType,
						admGroup: `${filial?.ID}-${institute?.ID}-${educ?.ID}-${pay?.ID}-${admType?.ID}`,
					}),
				);
			}
		}
	}),
	sagaEffects.takeEvery(priemAdmGroupsTransactionActions.success, function* () {
		const applications: Record<string, ITransaction<IPriemGroup>> = yield sagaEffects.select(
			priemAdmGroupsTrnSelector,
		);
		const downloaded = Object.values(applications).every(
			(item) => item.status === TransactionStatus.COMPLETED,
		);

		if (downloaded) {
			yield sagaEffects.put(newFetchPriemAppSuccessAction());
		}
	}),
	sagaEffects.takeEvery(priemAdmGroupsTransactionActions.success, function* ({ payload }) {
		const { response } = payload;
		const { filial, institute, direction, educLevel, profiles } = yield sagaEffects.select(
			applicationsFormSelector,
		);

		for (const profile of profiles) {
			yield sagaEffects.put(
				newAdmGroupsAddedAction({
					educLevel,
					filial,
					profile,
					inst: institute,
					dir: direction,
					educForm: payload.educForm,
					payForm: payload.payForm,
					admGroup: response[0],
				}),
			);
		}
	}),
];
