import { IAdmDictionaryItem, IDictionary, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { priemInstRest } from '$rests';
import {
	applicationAmdTypeSelector,
	applicationsFormSelector,
	disabledPayFormSelector,
} from '../selectors';
import { transactionSelector } from './selectors';
import { priemEducLevelsTrnActions } from './priemEducLevelsTransaction';

export const priemInstitutesTrnActions = createTransactionActions<
	IAdmDictionaryItem[],
	{ filial: IAdmDictionaryItem; eduLevel: IAdmDictionaryItem; admType: IAdmDictionaryItem }
>(TRANSACTION_NAMES.FetchPriemInstitutes);

export const priemInstitutesReducer = createTransactionReducer(priemInstitutesTrnActions, {
	cleanActions: [priemEducLevelsTrnActions.trigger],
});

export const priemInstitutesTransactionSelector = createSelector(
	transactionSelector,
	prop('priemInstitutes'),
);

export const priemInstsSaga = sagaEffects.transaction(priemInstitutesTrnActions, function* (
	payload,
) {
	const noPayForms: number[] = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemInstRest({
		filial: payload.filial.ID,
		eduLevel: payload.eduLevel.ID,
		noPayForms,
	});
});
