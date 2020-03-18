import { createTransactionActions } from '@black_bird/utils';
import { TRANSACTION_NAMES } from './names';

export const uploadDocumentsActions = createTransactionActions(TRANSACTION_NAMES.UploadDocumentsById);
export const priemEducFormsTransactionActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemEducationForms);
export const createPriemApplicationActions = createTransactionActions(TRANSACTION_NAMES.CreatePriemApplication);
