import {
	applicationsFormSelector,
	navigateToStep,
	onChangeDirectionAction,
	onChangeEducFormsAction,
	onChangeEducLevelAction,
	onChangeFilialAction,
	onChangeInstAction,
	onChangeProfilesAction,
	priemDirectionsTrnActions,
	priemEducFormsTransactionActions,
	priemEducLevelsTrnActions,
	priemInstitutesTrnActions,
	priemPayFormsTransactionActions,
	priemProfilesTransactionActions,
	newPriemAppAddedAction,
	priemAdmGroupsTransactionActions,
	newAdmGroupsAddedAction,
	priemFilialsTrnActions,
	priemAdmTypesTrnActions,
	cleanDefaultAdmTypeAction,
	onChangeAdmTypeAction,
} from '$store';
import { sagaEffects, guid } from '@black_bird/utils';
import { checkLigotaPriemStatus } from './documentsFormSagas';
import { IAdmDictionaryItem, IApplicationForm, SPO_FILIAL_ID } from '$common';

export const applicationFormSagas = [
	sagaEffects.takeEvery(onChangeFilialAction, function* () {
		const { filial } = yield sagaEffects.select(applicationsFormSelector);

		if (filial) {
			yield sagaEffects.put(priemEducLevelsTrnActions.trigger(filial));
		}
	}),
	sagaEffects.takeEvery(onChangeInstAction, function* () {
		const { filial, institute, educLevel } = yield sagaEffects.select(applicationsFormSelector);

		if (filial.ID === SPO_FILIAL_ID) {
			yield sagaEffects.put(cleanDefaultAdmTypeAction());

			yield sagaEffects.put(
				priemAdmTypesTrnActions.trigger({ filial, eduLevel: educLevel, inst: institute }),
			);
		} else {
			yield sagaEffects.put(priemDirectionsTrnActions.trigger(filial, educLevel, institute));
		}
	}),
	sagaEffects.takeEvery(onChangeEducLevelAction, function* () {
		const { filial, educLevel } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(priemInstitutesTrnActions.trigger(filial, educLevel));
	}),
	sagaEffects.takeEvery(onChangeDirectionAction, function* () {
		const { filial, institute, direction } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(priemProfilesTransactionActions.trigger(filial, institute, direction));
	}),
	sagaEffects.takeEvery(onChangeProfilesAction, function* () {
		const { filial, institute, direction } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(priemEducFormsTransactionActions.trigger(filial, institute, direction));
	}),
	sagaEffects.takeEvery(onChangeEducFormsAction, function* () {
		const { filial, institute, direction, educForms } = yield sagaEffects.select(
			applicationsFormSelector,
		);

		yield sagaEffects.put(
			priemPayFormsTransactionActions.trigger(filial, institute, direction, educForms),
		);
	}),
	sagaEffects.takeEvery(onChangeAdmTypeAction, function* () {
		const { filial, institute, educLevel } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(priemDirectionsTrnActions.trigger(filial, educLevel, institute));
	}),
	sagaEffects.takeEvery(newPriemAppAddedAction, function* () {
		const { filial, institute, direction, payForms, educForms, admType } = yield sagaEffects.select(
			applicationsFormSelector,
		);
		const key = guid();

		for (const educ of educForms) {
			for (const pay of payForms) {
				yield sagaEffects.put(
					priemAdmGroupsTransactionActions.trigger(
						filial,
						institute,
						direction,
						educ,
						pay,
						admType,
						key,
					),
				);
			}
		}
	}),
	sagaEffects.takeEvery(priemAdmGroupsTransactionActions.success, function* ({ payload }) {
		const { response }: any = payload;
		const { filial, institute, direction, educLevel, profiles } = yield sagaEffects.select(
			applicationsFormSelector,
		);
		console.log(payload);

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
