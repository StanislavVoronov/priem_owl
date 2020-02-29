import { IDocument, IGovernmentSelectItem, IPriemGroup, ISelectItem, VerificationMethod } from '$common';

export interface IContactsForm extends IDocument {
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
	prevEducation: ISelectItem | null;
	hasEge: boolean;
}

export interface IApplicationRequest {
	admId: number;
}
export interface IApplication extends IPriemGroup {
	filial: ISelectItem;
	institute: ISelectItem;
	educationLevel: ISelectItem;
	direction: ISelectItem;
	profile: ISelectItem;
	payForm: ISelectItem;
	educationForm: ISelectItem;
}
export interface IEnrollApplicationsForm {
	applications: IApplication[];
	currentFilial: ISelectItem | null;
	currentInstitute: ISelectItem | null;
	currentEducationLevel: ISelectItem | null;
	currentDirection: ISelectItem | null;
	currentProfile: ISelectItem | null;
	currentPayForms: ISelectItem[];
	priemGroups: IPriemGroup[];
	currentEducationForm: ISelectItem | null;
}
export interface IRegForm {
	lastName: string;
	firstName: string;
	middleName: string;
	birthday: string;
	gender: string;
}

export interface IForm<T extends object> {
	data: T;
	statusValidation: boolean;
}

export interface IPersonForm {
	document: IDocument;
	isApplyPersonData: boolean;
	photo: IDocument;
	birthPlace: string;
}
export interface IDocumentsForm {
	documents: IDocument[];
	priemGroupNeedDoc: boolean;
}
export interface ICreatePersonData {
	npId: number;
}
export interface IAccountVerificationForm {
	verificationMethod: VerificationMethod;
	verificationCode: string;
}
export type EnrollForms = IContactsForm & IEnrollEducationForm & IPersonForm & IDocument;

export interface IEnrollState {
	step: number;
	passedStep: number;
}
