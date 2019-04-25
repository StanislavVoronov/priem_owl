import { IContactDataForm, IEducationDataForm, IPersonDataForm, IRegisterDataForm } from './models';
import { defaultDocDataForm } from '../../platform';
import { Gender } from '../../common';

export const defaultContactsDataForm: IContactDataForm = {
	needDormitory: false,
	docFile: null,
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
	...defaultDocDataForm,
	docSubType: { id: 1, name: 'Паспорт гражданина РФ', needInfo: true, hasNumber: true },
	docType: { id: 1, name: 'Документ удостоверяющий личность', hasNumber: true, needInfo: true },
	photo: { docType: { id: 14, name: 'Фотография', hasNumber: false, needInfo: false }, docFile: null },
	docFile: null,
	birthPlace: '',
};

export const defaultEducationDataForm: IEducationDataForm = {
	...defaultDocDataForm,
	docType: { id: 2, name: 'Документ об предыдущем образовании', hasNumber: true, needInfo: true },
	docSubType: { id: 3, name: 'Аттестат о среднем (полном) общем образовании' },
	firstHighEducation: true,
	coolnessTypes: [],
	prevEducation: 3,
	hasEge: false,
};
