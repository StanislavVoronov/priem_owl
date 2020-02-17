import { IDocument } from '$common';
import { IContactsForm, IEnrollEducationForm, IEnrollPersonForm } from '$common';

export const defaultDocument: IDocument = {
	docGovernment: { id: 1, name: 'Россия' },
};

export const defaultEnrollPersonForm: IEnrollPersonForm = {
	...defaultDocument,
	docType: { id: 1, name: 'Документ удостоверяющий личность', need_info: 1, has_number: 1 },
	docSubType: { id: 1, name: 'Паспорт гражданина РФ' },
	isApplyPersonData: false,
	photo: { ...defaultDocument, docType: { id: 35, name: 'Фотография' } },
	birthPlace: '',
};

export const defaultEducationDataForm: IEnrollEducationForm = {
	...defaultDocument,
	docType: { id: 2, name: 'Документ об предыдущем образовании', need_info: 1, has_number: 1 },
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
