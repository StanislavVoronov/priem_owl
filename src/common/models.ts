import { Style } from 'jss/css';

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
export interface ISelectChanged {
	onChangeSelect: (field: string) => (value: ISelectItem) => void;
}

export interface IPersonDataState {
	firstName: string;
	lastName: string;
	middleName: string;
	gender?: string;
	birthday: string;
	personDocSeries: string;
	personDocNumber: string;
	personDocDate: string;
	personDocIssued: string;
	personDocCodeDepartment: string;
}

export interface IDictionaryPersonDocTypeFilter {
	type: number;
}

export interface IDictionaryNames {
	name: string;
	sex: number;
	type: number;
}
export type Space = 'none' | 'small' | 'middle' | 'big';
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
