import { IContactDataForm, IDocument, IEducationDataForm, IPersonDataForm, IRegisterDataForm } from './models';
import { Gender } from '../../common';
export const defaultDocument: IDocument = {
	docType: null,
	docFile: null,
	docGovernment: { id: 1, name: 'Россия' },
};

export const defaultContactsDataForm: IContactDataForm = {
	...defaultDocument,
	needDormitory: false,
	regLocality: '',
	docType: { id: 3, name: 'Регистрация места жительства', needInfo: false, hasNumber: false },
	phoneGovernment: { id: 1, name: 'Россия', phone_code: '7' },
	regIndex: '',
	regHome: '',
	regRegion: '',
	email: '',
	mobPhone: '',
	isRegAddressEqualLive: true,
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
	...defaultDocument,
	docSubType: { id: 1, name: 'Паспорт гражданина РФ', needInfo: true, hasNumber: true },
	docType: { id: 1, name: 'Документ удостоверяющий личность', hasNumber: true, needInfo: true },
	photo: { ...defaultDocument, docType: { id: 14, name: 'Фотография', hasNumber: false, needInfo: false } },
	birthPlace: '',
};

export const defaultEducationDataForm: IEducationDataForm = {
	...defaultDocument,
	docType: { id: 2, name: 'Документ об предыдущем образовании', hasNumber: true, needInfo: true },
	firstHighEducation: true,
	coolnessTypes: [],
	prevEducation: 3,
	hasEge: false,
};
