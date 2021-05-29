import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { priemAdmTypeRest } from '$rests';
import { disabledPayFormSelector } from '../selectors';
import { priemFilialsTrnActions } from './priemFilialsTransaction';
import { onChangeEducLevelAction, onChangeFilialAction } from '../applicationsForm';
import { priemEducFormsTransactionActions } from '../transactions';
import { transactionSelector } from './selectors';

interface IAdmTypePayload {
	filial: IAdmDictionaryItem;
	eduLevel: IAdmDictionaryItem;
	institute: IAdmDictionaryItem;
	direction: IAdmDictionaryItem;
	educForms: IAdmDictionaryItem[];
	payForms: IAdmDictionaryItem[];
}
export const priemAdmTypesTrnActions = createTransactionActions<
	IAdmDictionaryItem[],
	IAdmTypePayload
>(TRANSACTION_NAMES.FetchPriemAdmTypes);

export const priemAdmTypesReducer = createTransactionReducer(priemAdmTypesTrnActions, {
	cleanActions: [
		priemFilialsTrnActions.trigger,
		onChangeFilialAction,
		onChangeEducLevelAction,
		priemEducFormsTransactionActions.trigger,
	],
});

export const priemAdmTypesTrnSelector = createSelector(transactionSelector, prop('priemAdmTypes'));

export const priemAdmTypeSaga = sagaEffects.transaction(priemAdmTypesTrnActions, function* (
	payload,
) {

	return yield priemAdmTypeRest({
		filial: payload.filial.ID,
		institute: payload.institute.ID,
		eduLevel: payload.eduLevel.ID,
		direction: payload.direction.ID,
		educForms: payload.educForms.map((item) => item.ID),
		payForms: payload.payForms.map((item) => item.ID),
	});
});
