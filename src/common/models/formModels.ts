import { IDocument, IGovernmentSelectItem, IInvalidData, ISelectItem, VerificationMethod } from '$common';
import { IPerson } from '$common';

export interface IEnrollContactsForm extends IDocument {
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
}

export interface IChangeFieldAction {
	field: {
		[key: string]: any;
	};
}
export interface IEnrollEducationForm extends IDocument {
	firstHighEducation: boolean;
	coolnessTypes: ISelectItem[];
	prevEducation: number;
	hasEge: boolean;
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

export interface IEnrollPersonForm extends IDocument {
	isApplyPersonData: boolean;
	photo: IDocument;
	birthPlace: string;
}
export interface IDocumentsForm {
	documents: IDocument[];
}

export interface IAccountVerificationForm {
	verificationMethod: VerificationMethod;
	verificationCode: string;
}
export type EnrollForms = IEnrollContactsForm & IEnrollEducationForm & IEnrollPersonForm & IDocument;
