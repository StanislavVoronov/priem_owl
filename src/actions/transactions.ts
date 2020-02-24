import { createTransactionActions } from '@black_bird/utils';
import { TRANSACTION_NAMES } from './names';



export const findPersonActions = createTransactionActions(TRANSACTION_NAMES.FindPerson);
export const createVerificationCodeActions = createTransactionActions(TRANSACTION_NAMES.CreateVerificationCode);
export const createPersonActions = createTransactionActions(TRANSACTION_NAMES.CreatePerson);
export const uploadDocumentActions = createTransactionActions(TRANSACTION_NAMES.UploadDocument);
export const uploadDocumentsActions = createTransactionActions(TRANSACTION_NAMES.UploadDocumentsById);
export const updatePhoneActionsByKey = createTransactionActions(TRANSACTION_NAMES.UpdatePhone);
export const updateAddressActions = createTransactionActions(TRANSACTION_NAMES.UpdateAddress);
export const fetchPriemFilialsActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemFilials);
export const fetchPriemInstitutesActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemInstitutes);
export const fetchPriemEducationLevelsActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemEducationLevels);
export const fetchPriemDirectionsActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemDirections);
export const fetchPriemProfilesActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemProfiles);
export const fetchPriemPayFormsActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemPayForms);
export const fetchPriemEducationFormsActions = createTransactionActions(TRANSACTION_NAMES.FetchPriemEducationForms);
export const createPriemApplicationActions = createTransactionActions(TRANSACTION_NAMES.CreatePriemApplication);
export const fetchPriemGroups = createTransactionActions(TRANSACTION_NAMES.FetchPriemGroups);
