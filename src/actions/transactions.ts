import { createTransactionActions, createTransactionActionsById } from '$common';
import { TRANSACTION_NAMES } from './names';

export const checkLoginActions = createTransactionActions(TRANSACTION_NAMES.CheckLogin);
export const createLoginActions = createTransactionActions(TRANSACTION_NAMES.CreateLogin);
export const findPersonActions = createTransactionActions(TRANSACTION_NAMES.FindPerson);
export const createVerificationCodeActions = createTransactionActions(TRANSACTION_NAMES.CreateVerificationCode);
export const createPersonActions = createTransactionActions(TRANSACTION_NAMES.CreatePerson);
export const uploadDocumentActions = createTransactionActions(TRANSACTION_NAMES.UploadDocument);
export const uploadDocumentsActions = createTransactionActionsById(TRANSACTION_NAMES.UploadDocumentsById);
export const updatePhoneActionsByKey = createTransactionActions(TRANSACTION_NAMES.UpdatePhone);
export const updateAdressActions = createTransactionActions(TRANSACTION_NAMES.UpdateAddress);
