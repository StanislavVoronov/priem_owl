import { IDocument } from '$common';
import { IEnrollContactsForm, IEnrollEducationForm, IEnrollPersonForm, Gender } from '$common';

export const defaultDocument: IDocument = {
	docGovernment: { id: 1, name: 'Россия' },
};

export const defaultEnrollContactsForm: IEnrollContactsForm = {
	...defaultDocument,
	needDormitory: false,
	regLocality: '',
	regIndex: '',
	regHome: '',
	regRegion: '',
	email: '',
	mobPhone: '+7',
	isRegAddressEqualLive: true,
	docType: { id: 3, name: 'Регистрация места жительства' },
	mobileGovernment: { id: 1, name: 'Россия', phone_code: '7' },
};

export const defaultEnrollPersonForm: IEnrollPersonForm = {
	...defaultDocument,
	isApplyPersonData: false,
	photo: { ...defaultDocument, docType: { id: 35, name: 'Фотография' } },
	birthPlace: '',
};

export const defaultEducationDataForm: IEnrollEducationForm = {
	...defaultDocument,
	docType: { id: 2, name: 'Документ об предыдущем образовании', need_info: true, has_number: true },
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
