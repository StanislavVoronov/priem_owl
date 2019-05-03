export interface IDictionaryTypeFilter {
	type: number;
}

export interface IDictionaryScanableFilter {
	scanable: number;
}

export interface IDictionaryName {
	name: string;
	sex: number;
	type: number;
}

export interface IDocType extends ISelectItem {
	needInfo?: boolean;
	hasNumber?: boolean;
}

export interface IGovernmentSelectItem extends ISelectItem {
	name: string;
	id: number;
	phone_code: string;
}

export interface IClasses {
	classes: any;
}

export interface IDictionaryItem {
	id: string;
	name: string;
}

export interface ISelectItem {
	name: string;
	id: number;
}

export interface IDocument {
	docType: IDocType | null;
	docSubType?: IDocType | null;
	docGovernment: ISelectItem | null;
	docSeries?: string;
	docNumber?: string;
	docIssieBy?: string;
	docDate?: string;
	docFile: File | null;
	codeDepartment?: string;
}
