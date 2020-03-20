import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { ITransactionsState } from './transactionsModels';
import { priemLogoutRest } from '$rests';

export const priemLogoutTransactionActions = createTransactionActions('PRIEM_FILIALS');

export const priemLogoutReducer = createTransactionReducer(priemLogoutTransactionActions);

export const priemLogoutTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.priemLogout,
);

export const priemLogoutSaga = sagaEffects.rest(priemLogoutTransactionActions, priemLogoutRest);
