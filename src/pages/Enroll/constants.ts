import { EDictionaryNameList, IDictionaryScanableFilter, IDictionaryTypeFilter } from '../../common';

export const SHORT_DICTIONARY_LIST = [
	{
		name: EDictionaryNameList.FirstNames,
		dictionary: 'directory_names',
		columns: ['id', 'name', 'type', 'sex'],
		filter: (item: IDictionaryTypeFilter) => item.type === 0,
	},
	{
		name: EDictionaryNameList.MiddleNames,
		dictionary: 'directory_names',
		columns: ['id', 'name', 'type', 'sex'],
		filter: (item: IDictionaryTypeFilter) => item.type === 1,
	},
];

export const FULL_DICTIONARY_LIST = [
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
		columns: ['id', 'name', 'scanable', 'need_info', 'need_foreigner', 'has_number'],
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
	{
		dictionary: EDictionaryNameList.PriemSpecialCategories,
		columns: ['id', 'name'],
	},
];

export const NEW_PERSON_STEPS = [
	'Проверка личного дела',
	'Персональные данные',
	'Контактные данные',
	'Образование',
	'Заявления',
	'Документы',
	'Подтверждение личного дела',
];
// 'Заявления',
