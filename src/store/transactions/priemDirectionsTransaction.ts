import { IAdmDictionaryItem, IDictionary, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { priemDirectionRest } from '$rests';
import { applicationAmdTypeSelector, disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';
import { priemInstitutesTrnActions } from './priemInstitutesTransaction';

export const priemDirectionsTrnActions = createTransactionActions<
	IAdmDictionaryItem[],
	{ filial: IAdmDictionaryItem; educLevel: IAdmDictionaryItem; inst: IAdmDictionaryItem }
>(TRANSACTION_NAMES.FetchPriemDirections);

export const priemDirectionsReducer = createTransactionReducer(priemDirectionsTrnActions, {
	cleanActions: [priemInstitutesTrnActions.trigger],
});

export const priemDirectionsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemDirections'),
);

export const priemDirectionSaga = sagaEffects.transaction(priemDirectionsTrnActions, function* (
	payload,
) {
	const noPayForms: number[] = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemDirectionRest({
		filial: payload.filial.ID,
		eduLevel: payload.educLevel.ID,
		inst: payload.inst.ID,
		noPayForms,
	});
});
