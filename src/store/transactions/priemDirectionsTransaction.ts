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

export const priemDirectionsTrnActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemDirections,
	(filial: IAdmDictionaryItem, educLevel: IAdmDictionaryItem, inst: IAdmDictionaryItem) => ({
		filial,
		inst,
		educLevel,
	}),
);

export const priemDirectionsReducer = createTransactionReducer<IAdmDictionaryItem[]>(
	priemDirectionsTrnActions,
	{
		cleanActions: [priemInstitutesTrnActions.trigger],
	},
);

export const priemDirectionsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemDirections'),
);

export const priemDirectionSaga = sagaEffects.transaction(priemDirectionsTrnActions, function* (
	payload,
) {
	const noPayForms: number[] = yield sagaEffects.select(disabledPayFormSelector);
	const admType: IAdmDictionaryItem = yield sagaEffects.select(applicationAmdTypeSelector);

	return yield priemDirectionRest({
		filial: payload.filial.ID,
		eduLevel: payload.educLevel.ID,
		inst: payload.inst.ID,
		noPayForms,
		admType: admType.ID,
	});
});
