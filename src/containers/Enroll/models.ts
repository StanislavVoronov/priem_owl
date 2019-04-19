import { Gender, IGovernmentSelectItem } from '../../common';
import { IServerError } from './serverModels';
import { IDocDataItem } from './models';
import { ISelectItem } from '../../platform';

export interface PersonInfo {
	lastName: string;
	firstName: string;
	middleName: string;
	birthday: string;
}
export interface IRegisterDataForm extends PersonInfo {
	gender: Gender;
	login: string;
	password: string;
	repeatPassword: string;
}

export interface IDocDataItem extends IDocData {
	codeDepartment?: string;
}

export interface IDocData {
	docType: ISelectItem | null;
	docSubType?: ISelectItem | null;
	docGovernment?: ISelectItem | null;
	docSeries?: string;
	docNumber?: string;
	docIssieBy?: string;
	docDate?: string;
	docFile: File | null;
}

export interface IPersonDataForm extends IDocData {
	codeDepartment?: string;
	birthPlace: string;
}

export interface IEducationDataForm extends IDocData {
	firstHighEducation: boolean;
	coolnessTypes: ISelectItem[];
	prevEducation: number;
	hasEge: boolean;
}

export interface IContactDataForm extends IDocData {
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

export interface IPerson {
	registerData: IRegisterDataForm | null;
	personData: IPersonDataForm | null;
	contactsData: IContactDataForm | null;
	educationData: IEducationDataForm | null;
	documents: IDocDataItem[];
}
