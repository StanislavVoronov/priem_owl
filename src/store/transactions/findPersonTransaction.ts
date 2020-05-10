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

export const findPersonTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FindPerson,
	(data: IRegForm) => ({ data }),
);

export const findPersonReducer = createTransactionReducer<IFindPersonResponse>(
	findPersonTransactionActions,
);

export const isPersonFoundTransactionSelector = createSelector(transactionSelector, (state) => {
	const { isFetching, exception, result } = state.findPerson;
	const isFound = Array.isArray(result) && result.length > 0;

	return {
		isFetching,
		exception,
		result: isFound && result[0],
	};
});

export const findPersonSaga = sagaEffects.transaction(findPersonTransactionActions, (payload) =>
	findPersonRest(payload.data),
);
