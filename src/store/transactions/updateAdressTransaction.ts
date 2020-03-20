import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { ITransactionsState } from '$store';
import { updateAddressRest } from '$rests';
import { AddressType } from '$common';

export const updateAddressTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.UpdateAddress,
	(address: string, type: AddressType) => ({ address, type }),
);

export const updateAddressesReducer = createTransactionReducer(updateAddressTransactionActions, {
	mapToKey: payload => payload.type,
});

export const updateAddressTransactionSelector = createSelector(
	prop('transactions'),
	(state: any, key: AddressType) => key,
	(state: ITransactionsState, phone: AddressType) => state.updateAddresses[phone],
);

export const updateAddressesTransactionSelector = createSelector(
	prop('transactions'),
	(state: ITransactionsState) => state.updateAddresses,
);

export const updateAddressSaga = sagaEffects.rest(updateAddressTransactionActions, function*({ payload }) {
	return updateAddressRest(payload.address, payload.type);
});
