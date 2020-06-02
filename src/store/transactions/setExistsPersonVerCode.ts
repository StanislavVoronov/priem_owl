import {
	createSelector,
	createTransactionActions,
	createTransactionReducer,
	prop,
	sagaEffects,
} from '@black_bird/utils';

import { TRANSACTION_NAMES } from '$common';
import { transactionSelector } from './selectors';
import { ISetExistPersonVerCodeResponse, setExistPersonVerCodeRest } from '$rests';

export const setExistPersonVerCodeTrnActions = createTransactionActions<
	ISetExistPersonVerCodeResponse,
	{ npId: number; code: string }
>(TRANSACTION_NAMES.SET_EXIST_PERSON_VER_CODE);
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
