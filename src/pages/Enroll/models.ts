import { IDocument, IServerError } from '$common';
import { IContactsForm, IEducationForm, IPersonForm, IEnrollRegisterForm } from '$common';

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
	registrationForm: IEnrollRegisterForm;
	personData: IPersonForm;
	contactsData: IContactsForm;
	educationData: IEducationForm;
	documents: IDocument[];
}
export enum EnrollForm {
	Registration = 'Регистрация абитуриента',
	Person = 'Персональные данные',
	Contacts = 'Контактные данные',
	Education = 'Обрзование',
	Documents = 'Документы',
	ConfirmEmail = 'Подтверждение учетной записи',
}
export const EnrollSteps = [
	EnrollForm.Registration,
	EnrollForm.Person,
	EnrollForm.Contacts,
	EnrollForm.Education,
	EnrollForm.Documents,
	EnrollForm.ConfirmEmail,
];
