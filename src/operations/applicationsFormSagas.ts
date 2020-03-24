import {
	applicationsFormSelector,
	navigateToStep,
	onChangeDirectionAction,
	onChangeEducFormsAction,
	onChangeEducLevelAction,
	onChangeFilialAction,
	onChangeInstAction,
	onChangeProfilesAction,
	priemDirectionsTransactionActions,
	priemEducFormsTransactionActions,
	priemEducLevelsTransactionActions,
	priemFilialsTransactionActions,
	priemInstitutesTransactionActions,
	priemPayFormsTransactionActions,
	priemProfilesTransactionActions,
	newPriemAppAddedAction,
	submitApplicationFormAction,
	priemAdmGroupsTransactionActions,
	newAdmGroupsAddedAction,
	IAdmGroup,
} from '$store';
import { sagaEffects, guid } from '@black_bird/utils';

export const applicationFormSagas = [
	sagaEffects.takeEvery(onChangeFilialAction, function*() {
		const { filial } = yield sagaEffects.select(applicationsFormSelector);

		if (filial) {
			yield sagaEffects.put(priemEducLevelsTransactionActions.trigger(filial));
		}
	}),
	sagaEffects.takeEvery(onChangeInstAction, function*() {
		const { filial, institute, educLevel } = yield sagaEffects.select(applicationsFormSelector);

		if (filial && institute && educLevel) {
			yield sagaEffects.put(priemDirectionsTransactionActions.trigger(filial, educLevel, institute));
		}
	}),
	sagaEffects.takeEvery(onChangeEducLevelAction, function*() {
		const { filial, educLevel } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(priemInstitutesTransactionActions.trigger(filial, educLevel));
	}),
	sagaEffects.takeEvery(onChangeDirectionAction, function*() {
		const { filial, institute, direction } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(priemProfilesTransactionActions.trigger(filial, institute, direction));
	}),
	sagaEffects.takeEvery(onChangeProfilesAction, function*() {
		const { filial, institute, direction } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(priemEducFormsTransactionActions.trigger(filial, institute, direction));
	}),
	sagaEffects.takeEvery(onChangeEducFormsAction, function*() {
		const { filial, institute, direction, educForms } = yield sagaEffects.select(applicationsFormSelector);

		yield sagaEffects.put(priemPayFormsTransactionActions.trigger(filial, institute, direction, educForms));
	}),
	sagaEffects.takeEvery(newPriemAppAddedAction, function*() {
		const { filial, institute, direction, payForms, educForms } = yield sagaEffects.select(applicationsFormSelector);
		const key = guid();

		for (const educ of educForms) {
			for (const pay of payForms) {
				yield sagaEffects.put(priemAdmGroupsTransactionActions.trigger(filial, institute, direction, educ, pay, key));
			}
		}
	}),
	sagaEffects.takeEvery(priemAdmGroupsTransactionActions.success, function*({ payload }) {
		const { response }: any = payload;
		const { filial, institute, direction, educLevel, profiles } = yield sagaEffects.select(applicationsFormSelector);
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
