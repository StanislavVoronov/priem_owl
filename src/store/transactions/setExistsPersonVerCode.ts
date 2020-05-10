import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';

import { TRANSACTION_NAMES } from '$common';
import { transactionSelector } from './selectors';
import { setExistPersonVerCodeRest } from '$rests';

export const setExistPersonVerCodeTrnActions = createTransactionActions(
	TRANSACTION_NAMES.SET_EXIST_PERSON_VER_CODE,
	(npId: number, code: string) => ({
		code,
		npId,
	}),
);
export const setExistPersonVerCodeReducer = createTransactionReducer(
	setExistPersonVerCodeTrnActions,
);

export const setExistPersonVerCodeTrnSelector = createSelector(
	transactionSelector,
	prop('setExistPersonVerCode'),
);

export const setExistPersonVerCodeTrnSaga = sagaEffects.transaction(
	setExistPersonVerCodeTrnActions,
	(payload) => setExistPersonVerCodeRest(payload.npId, payload.code),
);
