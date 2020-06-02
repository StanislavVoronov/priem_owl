import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { IPersonInfo, TRANSACTION_NAMES } from '$common';
import { personInfoRest } from '$rests';
import { transactionSelector } from './selectors';

export const personInfoTrnActions = createTransactionActions<IPersonInfo>(
	TRANSACTION_NAMES.PERSON_INFO,
);

export const personInfoReducer = createTransactionReducer(personInfoTrnActions);

export const personInfoTrnSelector = createSelector(transactionSelector, (state) => {
	const { result } = state.personInfo;

	return { ...state.personInfo, result: result[0] };
});

export const personInfoSaga = sagaEffects.transaction(personInfoTrnActions, personInfoRest);
