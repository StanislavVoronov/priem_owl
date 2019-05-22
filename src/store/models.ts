import { DictionaryState } from '@mgutm-fcu/dictionary';
import { IEnrollRegisterStateForm } from '$common';
import { ITransactionState } from '$store';

export interface IRootState {
	dictionaries: DictionaryState;
	enrollRegistration: IEnrollRegisterStateForm;
	transactions: ITransactionState;
}
