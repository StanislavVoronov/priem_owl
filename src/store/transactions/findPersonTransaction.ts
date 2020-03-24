import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { ITransactionsState } from './transactionsModels';
import { IRegForm } from '$common';
import { findPersonRest } from '$rests';

export const findPersonTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.FindPerson,
	(data: IRegForm) => ({ data }),
);

export const findPersonReducer = createTransactionReducer(findPersonTransactionActions);

export const isPersonFoundTransactionSelector = createSelector(prop('transactions'), (state: ITransactionsState) => {
	const { isFetching, exception, result } = state.findPerson;
	const isFound = Array.isArray(result) && result.length > 0;

	return {
		isFetching,
		exception: isFound
			? {
					message:
						'Личное дело абитуриента было найдено. Просьба обратиться в приемную комиссию для дополнительной информации',
			  }
			: exception,
		result: isFound && result[0],
	};
});

export const findPersonSaga = sagaEffects.rest(findPersonTransactionActions, ({ payload }) =>
	findPersonRest(payload.data),
);
