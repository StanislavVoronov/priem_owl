import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';
import { updateAddressRest } from '$rests';
import { AddressType, AUTO_REQUEST_RETRY, TRANSACTION_NAMES } from '$common';
import { transactionSelector } from './selectors';

export const updateAddressTransactionActions = createTransactionActions(
	TRANSACTION_NAMES.UpdateAddress,
	(address: string, kind: AddressType) => ({ address, kind }),
);

export const updateAddressesReducer = createTransactionReducer(updateAddressTransactionActions, {
	mapToKey: (payload) => payload.kind,
});

export const updateAddressTransactionSelector = createSelector(
	transactionSelector,
	(state: any, key: AddressType) => key,
	(state, phone) => state.updateAddresses[phone],
);

export const updateAddressesTransactionSelector = createSelector(
	transactionSelector,
	prop('updateAddresses'),
);

export const updateAddressSaga = sagaEffects.rest(updateAddressTransactionActions, ({ payload }) =>
	updateAddressRest(payload.address, payload.kind),
);
