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

export const verPersonTrnActions = createTransactionActions<
	{ ver_id: number },
	{ npId: number; type?: 'email' | 'mobile_phone' }
>(TRANSACTION_NAMES.VER_PERSON, ({ npId, type }) => ({
	npId,
	type,
}));
export const verPersonReducer = createTransactionReducer(verPersonTrnActions);
export const verPersonTrnSelector = createSelector(transactionSelector, prop('verNp'));

export const verPersonTrnSaga = sagaEffects.transaction(verPersonTrnActions, (payload) =>
	verNpRest(payload.npId, payload.type || 'email'),
);
