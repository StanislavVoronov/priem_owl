import { IDocument, IGovernmentSelectItem, IInvalidData, ISelectItem } from '$common';
import { IPerson } from '$common';

export interface IContactsForm {
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

export interface IUpdateTextInputAction {
	field: {
		[key: string]: string;
	};
}
export interface IEducationForm {
	firstHighEducation: boolean;
	coolnessTypes: ISelectItem[];
	prevEducation: number;
	hasEge: boolean;
	document: IDocument;
}
export interface IEnrollRegistration extends IPerson {
	login: string;
	password: string;
	repeatPassword: string;
}

export interface IEnrollRegisterStateForm {
	data: IEnrollRegistration;
	validation: IInvalidData<IEnrollRegistration>;
	statusValidation: boolean;
}

export interface IPersonForm {
	isApplyPersonData: boolean;
	codeDepartment?: string;
	photo: IDocument;
	birthPlace: string;
	document: IDocument;
}
export interface IDocumentsForm {
	documents: IDocument[];
	cheatType: ISelectItem;
}

export type EnrollForms = IEnrollRegisterStateForm & IContactsForm & IEducationForm & IPersonForm & IDocument;
