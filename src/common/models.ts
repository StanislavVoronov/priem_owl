import { Style } from 'jss/css';
import { IDictionary } from '@mgutm-fcu/dictionary';

export interface IState {
	user: any;
	dictionaries: any[];
}

export interface ITextFieldChangeEvent {
	target: {
		value: string;
	};
}

export interface IAutocompleteChanged {
	onChangeAutocompleteTextField: (field: string) => (value: string, data?: any) => void;
}

export interface ITextFieldChanged {
	onChangeTextField: (field: string) => (text: string) => void;
}

export interface IDataChanged {
	onChangeData: (field: string) => (item: any) => void;
}

export interface IUploadFile {
	lastModified: Date;
	lastModifiedDate: Date;
	name: string;
	size: number;
	type: string;
	binary: string;
}

export interface ISelectChanged {
	onChangeSelect: (field: string) => (value: ISelectItem) => void;
}

export interface IDictionaryTypeFilter {
	type: number;
}

export interface IDictionaryScanableFilter {
	scanable: number;
}

export interface IDictionaryNames {
	name: string;
	sex: number;
	type: number;
}
export type Space =
	| 'none'
	| 'v-little'
	| 'v-small'
	| 'v-middle'
	| 'v-big'
	| 'v-large'
	| 'h-little'
	| 'h-small'
	| 'h-middle'
	| 'h-big'
	| 'h-large';
export interface ISpacable {
	space?: Space;
}

export interface ISelectItem {
	name: string;
	id: number;
	[key: string]: string | number;
}

export interface IStylable {
	style?: Style;
}

export interface IHelperText {
	helperText?: string;
}

export interface IDocDataForm {
	docType?: ISelectItem | null;
	docSubType?: ISelectItem | null;
	docNumber?: string;
	docSeries?: string;
	docIssued?: string;
	docDate?: Date | null;
	docFile: IUploadFile | null;
}
export interface IHasError {
	hasError?: boolean;
}

export interface IDictionaries {
	dictionaries: IDictionary[];
}

export interface IPersonDataState extends IDocDataForm {
	firstName: string;
	middleName?: string;
	lastName: string;
	birthday: Date | null;
	codeDepartment: string;
	gender: number | null;
}

export interface IEducationDataState extends IDocDataForm {
	hasEge: boolean;
	isfFirstHighEducation: boolean;
	prevEduc: ISelectItem | null;
	levelEduc: ISelectItem | null;
}

export interface IContactDataState extends IDocDataForm {
	regIndex: string;
	regRegion: string;
	regLocality: string;
	regStreet: string;
	regHome: string;
	regBlock?: string;
	regFlat?: string;
	isRegAddressEqualLive: boolean;
	liveIndex?: string;
	liveRegion?: string;
	liveLocality?: string;
	liveStreet?: string;
	liveHome?: string;
	liveBlock?: string;
	liveFlat?: string;
	needDormitory: boolean;
	mobCountry: ISelectItem;
	mobPhone: string;
	homePhone?: string;
	email: string;
}

export interface IApplicationDataForm {
	category?: ISelectItem | null;
	department?: ISelectItem | null;
	applicationList: IApplication[];
}

export interface IApplication {
	filial?: ISelectItem | null;
	inst?: ISelectItem | null;
	direction?: ISelectItem | null;
	profile?: ISelectItem | null;
	educationForm?: ISelectItem | null;
	payForm: ISelectItem | null;
	educationLevel: ISelectItem | null;
	id: number;
}

export interface IContactsDataState extends IDocDataForm {}
export interface IEducationDataState extends IDocDataForm {}
