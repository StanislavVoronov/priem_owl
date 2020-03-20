import { IDictionary } from '$common';

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

export interface IDocType extends IDictionary {
	scanable?: number;
	need_info?: number;
	has_num?: number;
	need_foreigner?: number;
}

export interface IGovernmentSelectItem extends IDictionary {
	name: string;
	id: number;
	phone_code: string;
}

export interface IAdmDictionaryItem {
	ID: number;
	NAME: string;
}

export interface IDocument {
	type: IDocType | null;
	subType: IDocType | null;
	government: IDictionary;
	series?: string;
	num?: string;
	issieBy?: string;
	date?: string;
	file: File | null;
	codeDepartment?: string;
	[key: string]: any;
}

export interface IStylable {
	classes: Record<string, string>;
}

