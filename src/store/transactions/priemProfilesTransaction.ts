import { IAdmDictionaryItem, IDictionary, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { priemProfilesRest } from '$rests';
import { applicationAmdTypeSelector, disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';
import { priemDirectionsTrnActions } from './priemDirectionsTransaction';

export const priemProfilesTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemProfiles,
	(filial: IAdmDictionaryItem, inst: IAdmDictionaryItem, direction: IAdmDictionaryItem) => ({
		filial,
		inst,
		direction,
	}),
);
export const priemProfilesReducer = createTransactionReducer<IAdmDictionaryItem[]>(
	priemProfilesTransactionActions,
	{
		cleanActions: [priemDirectionsTrnActions.trigger],
	},
);

export const priemProfilesTransactionSelector = createSelector(
	transactionSelector,
	prop('priemProfiles'),
);

export const priemProfilesSaga = sagaEffects.rest(priemProfilesTransactionActions, function* (
	payload,
) {
	const noPayForms: number[] = yield sagaEffects.select(disabledPayFormSelector);
	const admType: IAdmDictionaryItem = yield sagaEffects.select(applicationAmdTypeSelector);

	return yield priemProfilesRest({
		filial: payload.filial.ID,
		inst: payload.inst.ID,
		dir: payload.direction.ID,
		noPayForms,
		admType: admType.ID,
	});
});
