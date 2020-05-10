export interface IDictionary {
	id: number;
	name: string;
	type?: number;
	scanable?: number;
	need_info?: number;
	has_num?: number;
	need_foreigner?: number;
	hide?: number;
	complex?: number;
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

export interface IAdmGroupItem {
	ID: number;
	NEED_DOC: number;
}

export interface IDocument {
	type: IDictionary | null;
	subType: IDictionary | null;
	government: IDictionary;
	series?: string;
	num?: string;
	issieBy?: string;
	date?: string;
	file: File | null;
	codeDepartment?: string;
	cheatType?: IDictionary | null;
	[key: string]: any;
}

export interface IStylable {
	classes: Record<string, string>;
}

export interface IPersonDocument {
	ID: string;
	TYPE: string;
	SUBTYPE: string;
	SERIA: string;
	NUM: string;
	ISS_ORGANISATION: string;
	ISS_GOVERMENT: number;
}

export interface IPersonInfo {
	ID: string;
	BIRTHPLACE: string;
	NEED_HOSTEL: string;
	EMAIL: string;
	HIGH_FIRST: string;
	BEST_PREV_EDU: string;
}
