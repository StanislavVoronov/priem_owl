import { IContactDataForm, IEducationDataForm, IPersonDataForm, IRegisterDataForm } from './models';
import { Gender, IDocument } from '$common';
export const defaultDocument: IDocument = {
	docType: null,
	docFile: null,
	docGovernment: { id: 1, name: 'Россия' },
};

export const defaultContactsDataForm: IContactDataForm = {
	needDormitory: false,
	regLocality: '',
	regIndex: '',
	regHome: '',
	regRegion: '',
	email: '',
	mobPhone: '',
	isRegAddressEqualLive: true,
	document: {
		...defaultDocument,
		docType: { id: 3, name: 'Регистрация места жительства' },
	},
	phoneGovernment: { id: 1, name: 'Россия', phone_code: '7' },
};

export const defaultRegisterDataForm: IRegisterDataForm = {
	lastName: '',
	firstName: '',
	middleName: '',
	birthday: '',
	gender: Gender.None,
	login: '',
	password: '',
	repeatPassword: '',
};

export const defaultPersonDataForm: IPersonDataForm = {
	photo: { ...defaultDocument, docType: { id: 14, name: 'Фотография' } },
	birthPlace: '',
	document: {
		...defaultDocument,
		docSubType: { id: 1, name: 'Паспорт гражданина РФ', needInfo: true, hasNumber: true },
		docType: { id: 1, name: 'Документ удостоверяющий личность', hasNumber: true, needInfo: true },
	},
};

export const defaultEducationDataForm: IEducationDataForm = {
	document: { ...defaultDocument, docType: { id: 2, name: 'Документ об предыдущем образовании' } },
	firstHighEducation: true,
	coolnessTypes: [],
	prevEducation: 3,
	hasEge: false,
};
