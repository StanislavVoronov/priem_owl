import { Gender, IDocType, IDocument, IGovernmentSelectItem, ISelectItem } from '$common';
import { IServerError } from './serverModels';
import { IDocumentWithDepartment } from './models';

export interface IPerson {
	lastName: string;
	firstName: string;
	middleName: string;
	birthday: string;
	gender: Gender;
}
export interface IRegisterDataForm extends IPerson {
	login: string;
	password: string;
	repeatPassword: string;
}

export interface IDocumentWithDepartment extends IDocument {
	codeDepartment?: string;
}

export interface IPersonDataForm {
	codeDepartment?: string;
	photo: IDocument;
	birthPlace: string;
	document: IDocumentWithDepartment;
}

export interface IEducationDataForm {
	firstHighEducation: boolean;
	coolnessTypes: ISelectItem[];
	prevEducation: number;
	hasEge: boolean;
	document: IDocument;
}

export interface IContactDataForm {
	needDormitory: boolean;
	regIndex: string;
	regRegion: string;
	regLocality: string;
	regStreet?: string;
	regHome: string;
	regBlock?: string;
	regFlat?: string;
	liveIndex?: string;
	liveRegion?: string;
	liveLocality?: string;
	liveStreet?: string;
	liveHome?: string;
	liveBlock?: string;
	liveFlat?: string;
	homePhone?: string;
	mobPhone: string;
	isRegAddressEqualLive: boolean;
	phoneGovernment: IGovernmentSelectItem;
	email: string;
	document: IDocument;
}

export interface IEnrollState {
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
	registerData: IRegisterDataForm | null;
	personData: IPersonDataForm | null;
	contactsData: IContactDataForm | null;
	educationData: IEducationDataForm | null;
	documents: IDocumentWithDepartment[];
}
