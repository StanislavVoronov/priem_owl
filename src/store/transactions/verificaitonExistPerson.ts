import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';

import { TRANSACTION_NAMES } from '$common';
import { verNpRest } from '$rests';
import { transactionSelector } from './selectors';

export const verPersonTrnActions = createTransactionActions(
	TRANSACTION_NAMES.VER_PERSON,
	(npId: number, type: 'email' | 'mobile_phone' = 'email') => ({
		npId,
		type,
	}),
);
export const verPersonReducer = createTransactionReducer<{ ver_id: number }>(verPersonTrnActions);
export const verPersonTrnSelector = createSelector(transactionSelector, prop('verNp'));

export const verPersonTrnSaga = sagaEffects.transaction(verPersonTrnActions, (payload) =>
	verNpRest(payload.npId, payload.type),
);
