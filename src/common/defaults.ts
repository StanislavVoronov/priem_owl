import { IDocument } from '$common';
import { IContactsForm, IEducationForm, IPersonForm } from '$common';

export const defaultDocument: IDocument = {
	government: { id: 1, name: 'Россия' },
};

export const defaultPersonForm: IPersonForm = {
	document: {
		...defaultDocument,
		type: { id: 1, name: 'Документ, удостоверяющий личность', need_info: 1, has_number: 1 },
		subType: { id: 1, name: 'Паспорт гражданина РФ' },
	},
	isApplyPersonData: false,
	photo: { ...defaultDocument, docType: { id: 35, name: 'Фотография' } },
	birthPlace: '',
};

export const defaultEducationDataForm: IEducationForm = {
	document: {
		...defaultDocument,
		type: { id: 2, name: 'Документ об предыдущем образовании', need_info: 1, has_number: 1 },
	},
	firstHighEducation: true,
	coolnessTypes: [],
	prevEducation: { id: 1, name: 'Среднее общее' },
	hasEge: false,
};

export const initialTransactionState = {
	loading: false,
	result: [],
	error: null,
};
