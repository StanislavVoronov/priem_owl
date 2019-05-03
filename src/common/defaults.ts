import { IDocument } from '$common';
import { IContactsForm, IEducationForm, IPersonForm, IRegisterForm, Gender } from '$common';

export const defaultDocument: IDocument = {
	docType: null,
	docFile: null,
	docGovernment: { id: 1, name: 'Россия' },
};

export const defaultContactsDataForm: IContactsForm = {
	needDormitory: false,
	regLocality: '',
	regIndex: '',
	regHome: '',
	regRegion: '',
	email: '',
	mobPhone: '+7',
	isRegAddressEqualLive: true,
	document: {
		...defaultDocument,
		docType: { id: 3, name: 'Регистрация места жительства' },
	},
	phoneGovernment: { id: 1, name: 'Россия', phone_code: '7' },
};

export const defaultRegisterDataForm: IRegisterForm = {
	lastName: '',
	firstName: '',
	middleName: '',
	birthday: '',
	gender: Gender.None,
	login: '',
	password: '',
	repeatPassword: '',
};

export const defaultPersonDataForm: IPersonForm = {
	isApplyPersonData: false,
	photo: { ...defaultDocument, docType: { id: 14, name: 'Фотография' } },
	birthPlace: '',
	document: {
		...defaultDocument,
		docSubType: { id: 1, name: 'Паспорт гражданина РФ' },
		docType: { id: 1, name: 'Документ удостоверяющий личность', hasNumber: true, needInfo: true },
	},
};

export const defaultEducationDataForm: IEducationForm = {
	document: {
		...defaultDocument,
		docType: { id: 2, name: 'Документ об предыдущем образовании', needInfo: true, hasNumber: true },
	},
	firstHighEducation: true,
	coolnessTypes: [],
	prevEducation: 3,
	hasEge: false,
};
