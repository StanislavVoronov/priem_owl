import { IAdmDictionaryItem, IDictionary, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { priemInstRest } from '$rests';
import { applicationAmdTypeSelector, disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';
import { priemEducLevelsTrnActions } from './priemEducLevelsTransaction';

export const priemInstitutesTrnActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemInstitutes,
	(filial: IAdmDictionaryItem, eduLevel: IAdmDictionaryItem) => ({ filial, eduLevel }),
);

export const priemInstitutesReducer = createTransactionReducer<IAdmDictionaryItem[]>(
	priemInstitutesTrnActions,
	{
		cleanActions: [priemEducLevelsTrnActions.trigger],
	},
);

export const priemInstitutesTransactionSelector = createSelector(
	transactionSelector,
	prop('priemInstitutes'),
);

export const priemInstsSaga = sagaEffects.rest(priemInstitutesTrnActions, function* (payload) {
	const noPayForms: number[] = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemInstRest({
		filial: payload.filial.ID,
		eduLevel: payload.eduLevel.ID,
		noPayForms,
	});
});
