import {
	createSelector,
	createTransactionReducer,
	createTransactionActions,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { AUTO_RETRY_REQUEST, PhoneType, TRANSACTION_NAMES } from '$common';
import { IUpdatePhoneResponse, updatePhoneRest } from '$rests';
import { ITransactionsState } from '../transactionReducer';

export const updatePhoneTransactionActions = createTransactionActions<
	IUpdatePhoneResponse,
	{ phone: string; type: PhoneType }
>(TRANSACTION_NAMES.UpdatePhone, ({ phone, type }) => ({ phone, type }));

export const updatePhoneTransactionReducer = createTransactionReducer(
	updatePhoneTransactionActions,
	{
		mapToKey: (payload) => payload.type,
	},
);

export const updatePhoneTransactionSelector = createSelector(
	prop('transactions'),
	(state: unknown, key: string) => key,
	(state: ITransactionsState, phone: string) => state.updatePhones[phone],
);

export const updatePhoneSaga = sagaEffects.transaction(
	updatePhoneTransactionActions,
	(payload) => updatePhoneRest(payload.phone, payload.type),
	AUTO_RETRY_REQUEST,
);
