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

export const priemEducLevelsTrnActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemEducationLevels,
	(filial: IAdmDictionaryItem) => ({ filial }),
);

export const priemEducLevelsReducer = createTransactionReducer(priemEducLevelsTrnActions, {
	cleanActions: [priemFilialsTrnActions.trigger, onChangeFilialAction],
});

export const priemEducLevelsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemEducLevels'),
);

export const priemEducLevelSaga = sagaEffects.rest(priemEducLevelsTrnActions, function* (payload) {
	const payForms: number[] = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemEducLevelsRest(payload.filial.ID, payForms);
});
