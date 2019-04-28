import { Style } from 'jss/css';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { IEnrollState } from '../containers/Enroll';

export interface IRootState {
	user: any;
	dictionaries: Record<string, IDictionary>;
	enroll: IEnrollState;
}

export interface ITextFieldChangeEvent {
	target: {
		value: string;
	};
}

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

export type TypeSpace = 'none' | 'minor' | 'small' | 'normal' | 'large';

export interface IDisabled {
	disabled?: boolean;
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

export interface IStylable {
	style?: Style;
}
export interface IExtensible {
	fullWidth?: boolean;
}

export interface IServerResponseResult<T> {
	result: T[];
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
