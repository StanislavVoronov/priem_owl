import { IDocument, IServerError } from '$common';
import { IContactsForm, IEducationForm, IPersonForm, IRegisterForm } from '$common';

export interface IEnrollState {
	registrationCompleted: boolean;
	checkPersonFetching: boolean;
	npId: number;
	checkPersonError: IServerError | null;
	checkLoginFetching: boolean;
	checkLoginError: IServerError | null;
	registerPersonFetching: boolean;
	registerPersonError: IServerError | null;
	confirmationCodeAvailable: boolean;
	verifyPersonFetching: boolean;
	verifyPersonError: IServerError | null;
	createPersonFetching: boolean;
	createPersonError: IServerError | null;
	uploadDocsError: IServerError | null;
	uploadDocsFetching: boolean;
}

export interface IEnrollForm {
	registrationData: IRegisterForm;
	personData: IPersonForm;
	contactsData: IContactsForm;
	educationData: IEducationForm;
	documents: IDocument[];
}
