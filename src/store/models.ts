import { DictionaryState } from '@mgutm-fcu/dictionary';

import { ITransactionState } from '$store';
import {
	IEnrollEducationForm,
	IEnrollContactsForm,
	IEnrollPersonForm,
	IEnrollRegForm,
	IForm,
	IDocumentsForm,
	IAccountVerificationForm,
} from '$common';

export interface IRootState {
	dictionaries: DictionaryState;
	enrollRegistration: IEnrollRegForm;
	enrollContactsForm: IForm<IEnrollContactsForm>;
	enrollPersonForm: IForm<IEnrollPersonForm>;
	enrollEducationForm: IForm<IEnrollEducationForm>;
	enrollDocumentsForm: IForm<IDocumentsForm>;
	enrollAccountVerificationForm: IForm<IAccountVerificationForm>;
	transactions: ITransactionState;
}
