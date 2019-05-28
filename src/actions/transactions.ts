import { createTransactionActions } from '$common';
import { TRANSACTION_NAMES } from './names';

export const checkLoginActions = createTransactionActions(TRANSACTION_NAMES.CheckLogin);
export const createLoginActions = createTransactionActions(TRANSACTION_NAMES.CreateLogin);
export const findPersonActions = createTransactionActions(TRANSACTION_NAMES.FindPerson);
export const createVerificationCodeActions = createTransactionActions(TRANSACTION_NAMES.CreateVerificationCode);
