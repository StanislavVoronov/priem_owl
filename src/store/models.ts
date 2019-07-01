import { DictionaryState } from '@mgutm-fcu/dictionary';

import { ITransactionState } from '$store';
import {
	IEnrollEducationForm,
	IEnrollContactsForm,
	IEnrollPersonForm,
	IEnrollRegForm,
	IDocumentsForm,
	IAccountVerificationForm,
	IEnrollApplicationsForm,
} from '$common';

export interface IRootState {
	dictionaries: DictionaryState;
	enrollRegistration: IEnrollRegForm;
	enrollContactsForm: IEnrollContactsForm;
	enrollPersonForm: IEnrollPersonForm;
	enrollEducationForm: IEnrollEducationForm;
	enrollDocumentsForm: IDocumentsForm;
	enrollAccountVerificationForm: IAccountVerificationForm;
	enrollApplicationsForm: IEnrollApplicationsForm;
	transactions: ITransactionState;
}
