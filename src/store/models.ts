import { ITransactionsState } from '$store';
import { ITransaction } from '@black_bird/utils';

import {
	IEducationForm,
	IContactsForm,
	IPersonForm,
	IRegForm,
	IDocumentsForm,
	IVerAccountForm,
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
	documentsForm: IDocumentsForm;
	verAccountForm: IVerAccountForm;
	applicationsForm: IApplicationForm;
	transactions: ITransactionsState;
}
