import { DictionaryState } from '@mgutm-fcu/dictionary';
import { IEnrollRegisterStateForm } from '$common';
import { IEnrollTransactionState } from './transactions/enroll';

interface ITransactionState {
	enroll: IEnrollTransactionState;
}
export interface IRootState {
	dictionaries: DictionaryState;
	enrollRegistration: IEnrollRegisterStateForm;
	transactions: ITransactionState;
}
