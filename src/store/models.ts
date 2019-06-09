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
	IDocument,
} from '$common';

export interface IRootState {
	dictionaries: DictionaryState;
	enrollRegistration: IEnrollRegForm;
	enrollContactsForm: IEnrollContactsForm;
	enrollPersonForm: IEnrollPersonForm;
	enrollEducationForm: IEnrollEducationForm;
	enrollDocumentsForm: IDocument[];
	enrollAccountVerificationForm: IAccountVerificationForm;
	transactions: ITransactionState;
}
