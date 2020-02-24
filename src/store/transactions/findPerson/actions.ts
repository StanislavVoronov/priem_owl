import { createTransactionActions } from '@black_bird/utils';
import { TRANSACTION_NAMES } from '$actions';
import { IRegForm } from '$common';

export const findPersonTransactionActions = createTransactionActions(TRANSACTION_NAMES.FindPerson, (data: IRegForm) => ({ data }));
