import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';

import { TRANSACTION_NAMES } from '$actions';
import { verNpRest } from '$rests';
import { transactionSelector } from './selectors';

export const verPersonTrnActions = createTransactionActions(
	TRANSACTION_NAMES.VER_PERSON,
	(npId: number, type: 'email' | 'mobile_phone' = 'email') => ({
		npId,
		type,
	}),
);
export const verPersonReducer = createTransactionReducer(verPersonTrnActions);
export const verPersonTrnSelector = createSelector(transactionSelector, prop('verNp'));

export const verPersonTrnSaga = sagaEffects.rest(verPersonTrnActions, function* ({ payload }) {
	return yield verNpRest(payload.npId, payload.type);
});
