import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import { createTransactionActions, createTransactionReducer, sagaEffects } from '@black_bird/utils';
import { priemAdmTypeRest } from '$rests';
import { disabledPayFormSelector } from '../selectors';
import { priemFilialsTrnActions } from './priemFilialsTransaction';
import { onChangeEducLevelAction, onChangeFilialAction } from '../applicationsForm';
import { priemEducFormsTransactionActions } from '$store';

interface IAdmTypePayload {
	filial: IAdmDictionaryItem;
	eduLevel: IAdmDictionaryItem;
	inst: IAdmDictionaryItem;
}
export const priemAdmTypesTrnActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemAdmTypes,
	(payload: IAdmTypePayload) => payload,
);

export const priemAdmTypesReducer = createTransactionReducer(priemAdmTypesTrnActions, {
	cleanActions: [
		priemFilialsTrnActions.trigger,
		onChangeFilialAction,
		onChangeEducLevelAction,
		priemEducFormsTransactionActions.trigger,
	],
});

export const priemAdmTypeSaga = sagaEffects.rest(priemAdmTypesTrnActions, function* (payload) {
	const noPayForms: number[] = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemAdmTypeRest({
		filial: payload.filial.ID,
		inst: payload.inst.ID,
		eduLevel: payload.eduLevel.ID,
		noPayForms,
	});
});
