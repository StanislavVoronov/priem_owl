import { ISelectItem, IServerError } from '../../common';

export interface IRegisterFormData {
	lastName: string;
	firstName: string;
	middleName?: string;
	birthday: string;
	gender: string;
	email: string;
}

export interface IPersonFormData {
	docSeries: string;
	docNumber: string;
	docIssieBy: string;
	codeDepartment: string;
	docDate: string;
	docFile: File | null;
	government: ISelectItem | null;
}

export interface IEnrollReducer {
	checkPersonExistsFetching: boolean;
	npId: string;
	email: string;
	checkPersonExistsError: IServerError | null;
	checkPersonLoginFetching: boolean;
	personLoginExists: boolean;
	checkPersonLoginError: IServerError | null;
	registerNewPersonFetching: boolean;
	registerNewPersonError: IServerError | null;
	registerPersonData: IRegisterFormData | null;
}
