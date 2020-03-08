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
	submitApplicationFormAction,
} from '$store';
import { sagaEffects } from '@black_bird/utils';
import {
	fetchPriemDirections,
	fetchPriemEducForms,
	fetchPriemEducLevels,
	fetchPriemFilials,
	fetchPriemInstitutes,
	fetchPriemPayForms,
	fetchPriemProfiles,
} from '$rests';

export const applicationFormSagas = [
	sagaEffects.rest(priemFilialsTransactionActions, () => {
		return fetchPriemFilials();
	}),
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
	sagaEffects.rest(priemInstitutesTransactionActions, ({ payload }) => {
		return fetchPriemInstitutes(payload.filial.ID, payload.eduLevel.ID);
	}),
	sagaEffects.rest(priemEducLevelsTransactionActions, ({ payload }) => {
		return fetchPriemEducLevels(payload.filial.ID);
	}),
	sagaEffects.rest(priemDirectionsTransactionActions, ({ payload }) => {
		return fetchPriemDirections(payload.filial.ID, payload.educLevel.ID, payload.inst.ID);
	}),
	sagaEffects.rest(priemProfilesTransactionActions, ({ payload }) => {
		return fetchPriemProfiles(payload.filial.ID, payload.inst.ID, payload.direction.ID);
	}),
	sagaEffects.rest(priemEducFormsTransactionActions, ({ payload }) => {
		return fetchPriemEducForms(payload.filial.ID, payload.inst.ID, payload.direction.ID);
	}),
	sagaEffects.rest(priemPayFormsTransactionActions, ({ payload }) => {
		return fetchPriemPayForms(
			payload.filial.ID,
			payload.inst.ID,
			payload.direction.ID,
			payload.educForms.map(item => item.ID),
		);
	}),
	sagaEffects.takeEvery(submitApplicationFormAction, function*() {
		yield sagaEffects.put(handleNextStep());
	}),
];
