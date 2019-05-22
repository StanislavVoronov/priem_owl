import { createTransactionActions } from '$common';
import { TRANSACTION_NAMES } from './names';

export const checkLoginActions = createTransactionActions(TRANSACTION_NAMES.CheckLogin);
export const createLoginActions = createTransactionActions(TRANSACTION_NAMES.CreateLogin);
