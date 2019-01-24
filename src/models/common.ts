export interface IState {
	user: any;
	dictionaries: any[];
}

export enum EMarginSpaceType {
	None = 'none',
	Dense = 'dense',
	Normal = 'normal',
}

export interface ITextFieldChangeEvent {
	target: {
		value: string;
	};
}

export interface ITextFieldChange {
	onChangeTextField: (field: string) => (event: ITextFieldChangeEvent) => void;
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
