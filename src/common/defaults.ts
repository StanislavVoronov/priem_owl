import { IDocument } from '$common';
import { IEnrollContactsForm, IEducationForm, IEnrollPersonForm, Gender } from '$common';

export const defaultDocument: IDocument = {
	docType: null,
	docFile: null,
	docGovernment: { id: 1, name: 'Россия' },
};

export const defaultEnrollContactsForm: IEnrollContactsForm = {
	needDormitory: false,
	regLocality: '',
	regIndex: '',
	regHome: '',
	regRegion: '',
	email: '',
	mobPhone: '+7',
	isRegAddressEqualLive: true,
	regDocument: {
		...defaultDocument,
		docType: { id: 3, name: 'Регистрация места жительства' },
	},
	mobileGovernment: { id: 1, name: 'Россия', phone_code: '7' },
};

export const defaultEnrollPersonForm: IEnrollPersonForm = {
	isApplyPersonData: false,
	photo: { ...defaultDocument, docType: { id: 35, name: 'Фотография' } },
	birthPlace: '',
	personDocument: {
		...defaultDocument,
		docSubType: { id: 1, name: 'Паспорт гражданина РФ' },
		docType: { id: 1, name: 'Документ удостоверяющий личность', has_number: true, need_info: true },
	},
};

export const defaultEducationDataForm: IEducationForm = {
	document: {
		...defaultDocument,
		docType: { id: 2, name: 'Документ об предыдущем образовании', need_info: true, has_number: true },
	},
	firstHighEducation: true,
	coolnessTypes: [],
	prevEducation: 3,
	hasEge: false,
};

export const initialTransactionState = {
	loading: false,
	result: [],
	error: null,
};
