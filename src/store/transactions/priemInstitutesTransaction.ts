import { IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { fetchPriemInstitutes } from '$rests';

export const priemInstitutesTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemInstitutes,
	(filial: IAdmDictionaryItem, eduLevel: IAdmDictionaryItem) => ({ filial, eduLevel }),
);

export const priemInstitutesReducer = createTransactionReducer(priemInstitutesTransactionActions);

export const priemInstitutesTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemInstitutes,
);

export const priemInstsSaga = sagaEffects.rest(priemInstitutesTransactionActions, ({ payload }) => {
	return fetchPriemInstitutes(payload.filial.ID, payload.eduLevel.ID);
});
