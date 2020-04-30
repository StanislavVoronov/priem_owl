import {
	createSelector,
	createTransactionReducer,
	createTransactionActions,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { PhoneType, TRANSACTION_NAMES } from '$common';
import { ITransactionsState } from './transactionsModels';
import { updatePhoneRest } from '$rests';

export const updatePhoneTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.UpdatePhone,
	(phone: string, type: PhoneType) => ({ phone, type }),
);

export const updatePhoneTransactionReducer = createTransactionReducer(
	updatePhoneTransactionActions,
	{
		mapToKey: (payload) => payload.type,
	},
);

export const updatePhoneTransactionSelector = createSelector(
	prop('transactions'),
	(state: any, key: string) => key,
	(state: ITransactionsState, phone: string) => state.updatePhones[phone],
);

export const updatePhoneSaga = sagaEffects.rest(updatePhoneTransactionActions, ({ payload }) =>
	updatePhoneRest(payload.phone, payload.type),
);
