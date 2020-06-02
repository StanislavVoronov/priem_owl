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
	const noPayForms: number[] = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemAdmTypeRest({
		filial: payload.filial.ID,
		eduLevel: payload.eduLevel.ID,
		noPayForms,
	});
});
