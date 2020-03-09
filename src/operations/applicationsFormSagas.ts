import {
	applicationFormSelector,
	handleNextStep,
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
	newPriemApplicationAdded,
	submitApplicationFormAction,
	priemAdmGroupsTransactionActions,
} from '$store';
import { prop, sagaEffects, guid } from '@black_bird/utils';
import {
	fetchPriemDirections,
	fetchPriemEducForms,
	fetchPriemEducLevels,
	fetchPriemFilials,
	fetchPriemGroups,
	fetchPriemInstitutes,
	fetchPriemPayForms,
	fetchPriemProfiles,
} from '$rests';

export const applicationFormSagas = [

	sagaEffects.takeEvery(onChangeFilialAction, function*() {
		const { filial } = yield sagaEffects.select(applicationFormSelector);

		if (filial) {
			yield sagaEffects.put(priemEducLevelsTransactionActions.trigger(filial));
		}
	}),
	sagaEffects.takeEvery(onChangeInstAction, function*() {
		const { filial, institute, educLevel } = yield sagaEffects.select(applicationFormSelector);

		if (filial && institute && educLevel) {
			yield sagaEffects.put(priemDirectionsTransactionActions.trigger(filial, educLevel, institute));
		}
	}),
	sagaEffects.takeEvery(onChangeEducLevelAction, function*() {
		const { filial, educLevel } = yield sagaEffects.select(applicationFormSelector);

		if (filial) {
			yield sagaEffects.put(priemInstitutesTransactionActions.trigger(filial, educLevel));
		}
	}),
	sagaEffects.takeEvery(onChangeDirectionAction, function*() {
		const { filial, institute, direction } = yield sagaEffects.select(applicationFormSelector);

		if (filial && institute && direction) {
			yield sagaEffects.put(priemProfilesTransactionActions.trigger(filial, institute, direction));
		}
	}),
	sagaEffects.takeEvery(onChangeProfilesAction, function*() {
		const { filial, institute, direction } = yield sagaEffects.select(applicationFormSelector);

		if (filial && institute && direction) {
			yield sagaEffects.put(priemEducFormsTransactionActions.trigger(filial, institute, direction));
		}
	}),
	sagaEffects.takeEvery(onChangeEducFormsAction, function*() {
		const { filial, institute, direction, educForms } = yield sagaEffects.select(applicationFormSelector);

		if (filial && institute && direction) {
			yield sagaEffects.put(priemPayFormsTransactionActions.trigger(filial, institute, direction, educForms));
		}
	}),
	sagaEffects.takeEvery(newPriemApplicationAdded, function*() {
		const { filial, institute, direction, payForms, educForms } = yield sagaEffects.select(applicationFormSelector);
		const key = guid();

		yield sagaEffects.put(priemAdmGroupsTransactionActions.trigger(filial, institute, direction, educForms, payForms, key));
	}),
	sagaEffects.takeEvery(submitApplicationFormAction, function*() {
		yield sagaEffects.put(handleNextStep());
	}),
];
