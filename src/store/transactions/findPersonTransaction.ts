import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$common';
import { IRegForm } from '$common';
import { findPersonRest, IFindPersonResponse } from '$rests';
import { transactionSelector } from './selectors';

export const findPersonTransactionActions = createTransactionActions<IFindPersonResponse, IRegForm>(
	TRANSACTION_NAMES.FindPerson,
);

export const findPersonReducer = createTransactionReducer(findPersonTransactionActions);

export const isPersonFoundTransactionSelector = createSelector(transactionSelector, (state) => {
	const { isFetching, exception, result } = state.findPerson;
	const isFound = Array.isArray(result) && result.length > 0;

	return {
		isFetching,
		exception,
		result: isFound && result,
	};
});

export const findPersonSaga = sagaEffects.transaction(findPersonTransactionActions, (payload) =>
	findPersonRest(payload),
);
