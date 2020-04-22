import { EDictionaryNameList, IDictionaryScanableFilter, IDictionaryTypeFilter } from '$common';

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
		dictionary: EDictionaryNameList.PreviousEducation,
		columns: ['id', 'name', 'order_place'],
	},
	{ dictionary: EDictionaryNameList.Governments, columns: ['id', 'name', 'phone_code'] },
	{
		dictionary: EDictionaryNameList.DocTypes,
		columns: ['id', 'name', 'scanable', 'need_info', 'need_foreigner', 'has_num'],
		filter: (item: IDictionaryScanableFilter) => item.scanable === 1,
	},
	{
		name: EDictionaryNameList.DocSubTypes,
		dictionary: 'directory_doc_subtypes',
		columns: ['id', 'name', 'type'],
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
	'Отправка документов',
];
