import { IDocument } from '$common';
import { IContactsForm, IEducationForm, IPersonForm } from '$common';

export const defaultDocument: IDocument = {
	type: null,
	file: null,
	subType: null,
	government: { id: 1, name: 'Россия' },
	id: 0
};

export const defaultPersonForm: IPersonForm = {
	document: {
		...defaultDocument,
		type: { id: 1, name: 'Документ, удостоверяющий личность', need_info: 1, has_num: 1 },
		subType: { id: 1, name: 'Паспорт гражданина РФ' },
	},
	isApplyPersonData: false,
	photo: { ...defaultDocument, docType: { id: 35, name: 'Фотография' } },
	birthplace: '',
	codeDepartment: '',
};

export const defaultEducationDataForm: IEducationForm = {
	document: {
		...defaultDocument,
		type: { id: 2, name: 'Документ об предыдущем образовании', need_info: 1, has_num: 1 },
	},
	firstHighEducation: true,
	prevEducation: null,
	hasEge: false,
};

export const initialTransactionState = {
	loading: false,
	result: [],
	error: null,
};

export const defaultDocType = { id: 0, name: '' };
