import { ITransactionState } from '$store';
import {
	IEnrollEducationForm,
	IContactsForm,
	IEnrollPersonForm,
	IRegForm,
	IDocumentsForm,
	IAccountVerificationForm,
	IEnrollApplicationsForm,
	IEnrollState,
} from '$common';

export interface IRootState {
	enroll: IEnrollState;
	dictionaries: Record<string, any>;
	regForm: IRegForm;
	contactsForm: IContactsForm;
	enrollPersonForm: IEnrollPersonForm;
	enrollEducationForm: IEnrollEducationForm;
	enrollDocumentsForm: IDocumentsForm;
	enrollAccountVerificationForm: IAccountVerificationForm;
	enrollApplicationsForm: IEnrollApplicationsForm;
	transactions: ITransactionState;
}
