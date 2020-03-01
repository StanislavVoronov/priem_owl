import { ITransactionsState } from '$store';
import {
	IEducationForm,
	IContactsForm,
	IPersonForm,
	IRegForm,
	IDocumentsForm,
	IAccountVerificationForm,
	IApplicationForm,
	IEnrollState,
} from '$common';

export interface IRootState {
	enroll: IEnrollState;
	dictionaries: Record<string, any>;
	regForm: IRegForm;
	contactsForm: IContactsForm;
	personForm: IPersonForm;
	educationForm: IEducationForm;
	enrollDocumentsForm: IDocumentsForm;
	enrollAccountVerificationForm: IAccountVerificationForm;
	applicationsForm: IApplicationForm;
	transactions: ITransactionsState;
}
