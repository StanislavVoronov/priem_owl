import { ISelectItem } from '../../common';

export interface IPersonData {
	lastName: string;
	firstName: string;
	middleName: string;
	gender: string;
	docSeries: string;
	docNumber: string;
	docIssieBy: string;
	codeDepartment: string;
	docDate: string;
	birthday: Date | null;
	docFile: File | null;
	government: ISelectItem | null;
}
