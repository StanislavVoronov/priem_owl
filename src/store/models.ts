import { DictionaryState } from '@mgutm-fcu/dictionary';

import { ITransactionState } from '$store';
import { IEnrollContactsForm, IEnrollPersonForm, IEnrollRegForm, IForm } from '$common';

export interface IRootState {
	dictionaries: DictionaryState;
	enrollRegistration: IForm<IEnrollRegForm>;
	enrollContactsForm: IForm<IEnrollContactsForm>;
	enrollPersonForm: IForm<IEnrollPersonForm>;
	transactions: ITransactionState;
}
