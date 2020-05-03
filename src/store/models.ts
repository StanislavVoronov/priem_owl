import { ITransaction } from '@black_bird/utils';

import { ITransactionsState } from './transactionReducer';

import {
	IEducationForm,
	IContactsForm,
	IPersonForm,
	IRegForm,
	IDocumentsForm,
	IVerAccountForm,
	IApplicationForm,
	IEnrollState,
	IAdmDictionaryItem,
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

export type IAdmTransactionList = ITransaction<IAdmDictionaryItem[]>;
