import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { priemEducLevelsRest } from '$rests';
import { disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';
import { priemFilialsTrnActions } from './priemFilialsTransaction';
import { onChangeFilialAction } from '../applicationsForm';

export const priemEducLevelsTrnActions = createTransactionActions<
	IAdmDictionaryItem[],
	IAdmDictionaryItem
>(TRANSACTION_NAMES.FetchPriemEducationLevels);

export const priemEducLevelsReducer = createTransactionReducer(priemEducLevelsTrnActions, {
	cleanActions: [priemFilialsTrnActions.trigger, onChangeFilialAction],
});

export const priemEducLevelsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemEducLevels'),
);

export const priemEducLevelSaga = sagaEffects.transaction(priemEducLevelsTrnActions, function* (
	payload,
) {
	const payForms: number[] = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemEducLevelsRest(payload.ID, payForms);
});
