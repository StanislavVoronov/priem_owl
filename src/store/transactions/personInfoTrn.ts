import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { IPersonInfo, TRANSACTION_NAMES } from '$common';
import { personInfoRest } from '$rests';
import { transactionSelector } from './selectors';

export const personInfoTrnActions = createTransactionActions(TRANSACTION_NAMES.PERSON_INFO);

export const personInfoReducer = createTransactionReducer<IPersonInfo>(personInfoTrnActions);

export const personInfoTrnSelector = createSelector(transactionSelector, (state) => {
	return state.personInfo;
});

export const personInfoSaga = sagaEffects.transaction(personInfoTrnActions, personInfoRest);
