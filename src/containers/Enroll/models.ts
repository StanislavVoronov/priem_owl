import { ISelectItem, IServerError } from '../../common';

export interface IRegisterFormData {
	lastName: string;
	firstName: string;
	middleName?: string;
	birthday: string;
	gender: string;
	email: string;
}
export interface IDocDataForm {
	docSeries: string;
	docNumber: string;
	docIssieBy: string;
	docDate: string;
	docFile: File | null;
}

export interface IPersonDataForm extends IDocDataForm {
	codeDepartment: string;
	government: ISelectItem | null;
}

export interface IEducationDataForm extends IDocDataForm {
	firstHighEducation: boolean;
	personCoolnessTypes: ISelectItem[];
	prevEducation: ISelectItem | null;
	hasEge: boolean;
}

export interface IContactDataForm {
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
	regDocFile: File | null;
	isRegAddressEqualLive: boolean;
	phoneCode: string;
}

export interface IEnrollReducer {
	checkPersonExistsFetching: boolean;
	npId: string;
	email: string;
	checkPersonExistsError: IServerError | null;
	checkPersonLoginFetching: boolean;
	personLoginExists: boolean;
	checkPersonLoginError: IServerError | null;
	registerNewPersonFetching: boolean;
	registerNewPersonError: IServerError | null;
	registerPersonData: IRegisterFormData | null;
}
