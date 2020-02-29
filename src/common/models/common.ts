import { IServerError } from '$common';
import { Action, ActionFunctionAny } from 'redux-actions';

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
	scanable?: number;
	need_info?: number;
	has_number?: number;
	need_foreigner?: number;
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
	type?: IDocType | null;
	subType?: IDocType | null;
	government: ISelectItem;
	series?: string;
	num?: string;
	issieBy?: string;
	date?: string;
	file?: File;
	codeDepartment?: string;
	[key: string]: any
}

export interface IStylable {
	classes: Record<string, string>;
}

export interface IInvalidData<T> {
	validation: Record<keyof T, string>;
}

export interface ITransaction<T> {
	loading: boolean;
	result: T[];
	error: IServerError | null;
}

export interface ITransactionActions<R, S, F> {
	request: ActionFunctionAny<Action<R>>;
	success: ActionFunctionAny<Action<S>>;
	failure: ActionFunctionAny<Action<F>>;
}

export interface ITransactionActions<R, S, F> {
	request: ActionFunctionAny<Action<R>>;
	success: ActionFunctionAny<Action<S>>;
	failure: ActionFunctionAny<Action<F>>;
}
