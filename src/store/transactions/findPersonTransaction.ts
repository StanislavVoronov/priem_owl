import { createSelector, createTransactionActions, createTransactionReducer, prop } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { ITransactionsState } from './transactionsModels';
import { IRegForm } from '$common';

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
						'Абитуриент уже зарегистрирован в системе. Просьба, обратиться в приемную комиссию для подачи заявлений на поступление',
			  }
			: exception,
		result: isFound && result[0],
	};
});
