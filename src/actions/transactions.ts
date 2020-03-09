import { createTransactionActions } from '@black_bird/utils';
import { TRANSACTION_NAMES } from './names';


export const findPersonTransactionActions = createTransactionActions(TRANSACTION_NAMES.FindPerson);
export const createVerificationCodeActions = createTransactionActions(TRANSACTION_NAMES.CreateVerificationCode);
export const createPersonTransactionActions = createTransactionActions(TRANSACTION_NAMES.CreatePerson);
export const uploadDocumentActions = createTransactionActions(TRANSACTION_NAMES.UploadDocument);
export const uploadDocumentsActions = createTransactionActions(TRANSACTION_NAMES.UploadDocumentsById);
export const updatePhoneActionsByKey = createTransactionActions(TRANSACTION_NAMES.UpdatePhone);
export const updateAddressActions = createTransactionActions(TRANSACTION_NAMES.UpdateAddress);
export const priemEducFormsTransactionActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemEducationForms);
export const createPriemApplicationActions = createTransactionActions(TRANSACTION_NAMES.CreatePriemApplication);
export const fetchPriemGroups = createTransactionActions(TRANSACTION_NAMES.FetchPriemGroups);
