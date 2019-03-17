import { Style } from 'jss/css';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { IEnrollReducer } from '../containers/Enroll';

export interface IRootState {
	user: any;
	dictionaries: Record<string, IDictionary>;
	enroll: IEnrollReducer;
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

export interface ISelectChanged {
	onChangeSelect: (field: string) => (value: ISelectItem) => void;
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
export interface ISpacable {
	verticalSpace?: TypeSpace;
	horizontalSpace?: TypeSpace;
}

export interface IDisabled {
	disabled?: boolean;
}

export interface ISelectItem {
	name: string;
	id: string;
	[key: string]: string;
}

export interface IStylable {
	style?: Style;
}
export interface IExtensible {
	fullWidth?: boolean;
}
export interface IHelperText {
	helperText?: string;
}

export interface IHasError {
	hasError?: boolean;
}
export interface IDictionaries {
	dictionaries: IDictionary[];
}

export interface IServerResponseResult<T> {
	result: T[];
}
