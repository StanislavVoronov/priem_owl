import { IContactDataForm, IEducationDataForm, IPersonDataForm, IRegisterDataForm } from './models';
import { defaultDocDataForm } from '../../platform';
import { EDictionaryNameList, Gender, IDictionaryScanableFilter, IDictionaryTypeFilter } from '../../common';

export const defaultContactsDataForm: IContactDataForm = {
	needDormitory: false,
	docFile: null,
	regLocality: '',
	docType: { id: 3, name: 'Регистрация места жительства' },
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
	...defaultDocDataForm,
	docType: { id: 1, name: 'Документ удостоверяющий личность' },
	docFile: null,
	birthPlace: '',
};

export const defaultEducationDataForm: IEducationDataForm = {
	...defaultDocDataForm,
	docType: { id: 2, name: 'Документ об предыдущем образовании' },
	firstHighEducation: true,
	coolnessTypes: [],
	prevEducation: 3,
	hasEge: false,
};
