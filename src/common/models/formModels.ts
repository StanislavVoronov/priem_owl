import { IDocument, IGovernmentSelectItem, IInvalidData, ISelectItem } from '$common';
import { IPerson } from '$common';

export interface IEnrollContactsForm {
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
	mobileGovernment: IGovernmentSelectItem;
	email: string;
	regDocument: IDocument;
}

export interface IChangeFieldAction {
	field: {
		[key: string]: any;
	};
}
export interface IEnrollEducationForm {
	firstHighEducation: boolean;
	coolnessTypes: ISelectItem[];
	prevEducation: number;
	hasEge: boolean;
	educationDocument: IDocument;
}
export interface IEnrollRegForm {
	lastName: string;
	firstName: string;
	middleName: string;
	birthday: string;
	gender: number;
}

export interface IForm<T extends object> {
	data: T;
	statusValidation: boolean;
}

export interface IEnrollPersonForm {
	isApplyPersonData: boolean;
	photo: IDocument;
	birthPlace: string;
	personDocument: IDocument;
}
export interface IDocumentsForm {
	documents: IDocument[];
	cheatType: ISelectItem;
}

export type EnrollForms = IEnrollContactsForm & IEnrollEducationForm & IEnrollPersonForm & IDocument;
