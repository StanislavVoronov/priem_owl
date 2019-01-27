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
	onChangeData: <T>(field: string) => (item: T) => void;
}

export interface ISelectChanged {
	onChangeSelect: (field: string) => (value: ISelectItem) => void;
}

export interface IDictionaryPersonDocTypeFilter {
	type: number;
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

interface IDocDataForm {
	type: string;
	docNumber: string;
	docSeries: string;
	docIssued: string;
	docDate: string;
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

export interface IContactsDataState extends IDocDataForm {}
export interface IEducationDataState extends IDocDataForm {}
