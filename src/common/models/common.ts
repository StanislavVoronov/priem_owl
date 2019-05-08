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
	scanable?: boolean;
	need_info?: boolean;
	has_number?: boolean;
	need_foreigner?: boolean;
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
	docGovernment: ISelectItem;
	docSeries?: string;
	docNumber?: string;
	docIssieBy?: string;
	docDate?: string;
	docFile: File | null;
	codeDepartment?: string;
}

export interface IStylable {
	classes: Record<string, string>;
}
