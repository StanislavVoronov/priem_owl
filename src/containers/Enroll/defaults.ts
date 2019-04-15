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

export const shortDictionaryList = [
	{
		name: EDictionaryNameList.MiddleNames,
		dictionary: 'directory_names',
		columns: ['id', 'name', 'type', 'sex'],
		filter: (item: IDictionaryTypeFilter) => item.type === 1,
	},
];

export const fullDictionaryList = [
	{
		dictionary: EDictionaryNameList.CoolnessTypes,
		columns: ['id', 'name', 'hidden'],
		filter: (item: number) => item !== 1,
	},
	{ dictionary: EDictionaryNameList.Governments, columns: ['id', 'name', 'phone_code'] },
	{
		name: EDictionaryNameList.PersonDocTypes,
		dictionary: 'directory_doc_subtypes',
		columns: ['id', 'name', 'type'],
		filter: (item: IDictionaryTypeFilter) => item.type === 1,
	},
	{
		dictionary: EDictionaryNameList.DocTypes,
		columns: ['id', 'name', 'scanable', 'need_info'],
		filter: (item: IDictionaryScanableFilter) => item.scanable === 1,
	},
	{
		name: EDictionaryNameList.EducationDocTypes,
		dictionary: 'directory_doc_subtypes',
		columns: ['id', 'name', 'type'],
		filter: (item: IDictionaryTypeFilter) => item.type === 2,
	},
	{
		name: EDictionaryNameList.FirstNames,
		dictionary: 'directory_names',
		columns: ['id', 'name', 'type', 'sex'],
		filter: (item: IDictionaryTypeFilter) => item.type === 0,
	},

	{
		dictionary: EDictionaryNameList.PreviousEducation,
		columns: ['id', 'name'],
	},
];
