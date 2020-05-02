import { EDictionaryNameList, IDictionary } from '$common';

export const SHORT_DICTIONARY_LIST = [
	{
		name: EDictionaryNameList.Names,
		dictionary: 'directory_names',
		columns: ['id', 'name', 'type', 'sex'],
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
		filter: (item: IDictionary) => item.scanable === 1,
	},
	{
		name: EDictionaryNameList.DocSubTypes,
		dictionary: 'directory_doc_subtypes',
		columns: ['id', 'name', 'type', 'hide', 'complex'],
	},
	{
		dictionary: EDictionaryNameList.SpoTypes,
		columns: ['id', 'name'],
		filter: (item: IDictionary) => item.id === 1 || item.id === 2,
	},
	{
		dictionary: EDictionaryNameList.PreviousEducation,
		columns: ['id', 'name'],
	},
	{
		dictionary: EDictionaryNameList.CheatTypes,
		columns: ['id', 'name'],
	},
];

export const NEW_PERSON_STEPS = [
	'Проверка личного дела',
	'Персональные данные',
	'Контактные данные',
	'Образование',
	'Документы',
	'Заявления',
	'Отправка документов',
];
