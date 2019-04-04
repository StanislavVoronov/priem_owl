import { Gender, IGovernmentSelectItem, ISelectItem } from '../../common';
import { IServerError } from './serverModels';
import { IDocDataItem } from './components/DocumentsDataForm';

export interface PersonInfo {
	lastName: string;
	firstName: string;
	middleName: string;
	birthday: string;
}
export interface IRegisterFormData extends PersonInfo {
	gender: Gender;
	login: string;
	password: string;
}
export interface IDocData {
	docType: ISelectItem | null;
	docSubType?: ISelectItem | null;
	docGovernment?: ISelectItem | null;
	docSeries?: string;
	docNumber?: string;
	docIssieBy?: string;
	docDate?: string;
	docFile: IDocFile | null;
}

export interface IPersonDataForm extends IDocData {
	codeDepartment: string;
	birthPlace: string;
}

export interface IEducationDataForm extends IDocData {
	firstHighEducation: boolean;
	coolnessTypes: ISelectItem[];
	prevEducation: number;
	hasEge: boolean;
}
export interface IDocFile {
	source: File;
	blob: ArrayBuffer | string | null;
}

export interface IContactDataForm extends IDocData {
	needDormitory: boolean;
	regIndex: string;
	regRegion: string;
	regLocality: string;
	regStreet: string;
	regHome: string;
	regBlock: string;
	regFlat: string;
	liveIndex: string;
	liveRegion: string;
	liveLocality: string;
	liveStreet: string;
	liveHome: string;
	liveBlock: string;
	liveFlat: string;
	homePhone: string;
	mobPhone: string;
	isRegAddressEqualLive: boolean;
	phoneGovernment: IGovernmentSelectItem;
	email: string;
}

export interface IEnrollFetchingDataReducer {
	checkPersonExistsFetching: boolean;
	npId: number;
	email: string;
	checkPersonExistsError: IServerError | null;
	checkPersonLoginFetching: boolean;
	checkPersonLoginError: IServerError | null;
	registerNewPersonFetching: boolean;
	registerNewPersonError: IServerError | null;
	registerPersonData: IRegisterFormData | null;
	confirmationCodeAvailable: boolean;
	verifyPersonFetching: boolean;
	verifyPersonError: IServerError | null;
	createPersonFetching: boolean;
	createPersonError: IServerError | null;
	uploadDocsError: IServerError | null;
	uploadDocsFetching: boolean;
}

export interface IPerson {
	registerData?: IRegisterFormData;
	personData?: IPersonDataForm;
	contactsData?: IContactDataForm;
	educationData?: IEducationDataForm;
	documents?: IDocDataItem[];
}
