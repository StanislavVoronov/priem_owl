import { createSelector } from '@black_bird/utils';
import {
	DOCUMENT_TYPE,
	EDictionaryNameList,
	IDictionary,
	IDocument,
	INamesDictionary,
	validateDocument,
} from '$common';
import { IRootState } from '../models';
import {
	applicationsFormSelector,
	educationFormSelector,
	isForeignerSelector,
} from './formSelectors';
import { DEFAULT_TRANSACTION } from './defaults';

export const dictionaryStateSelector = (state: IRootState) => {
	return state.dictionaries;
};

export const getFirstNamesDictionary = createSelector(dictionaryStateSelector, (state) => {
	const transaction = state[EDictionaryNameList.Names];
	if (transaction) {
		return {
			...transaction,
			result: transaction.result.filter((item: INamesDictionary) => item.type === 0),
		};
	}

	return DEFAULT_TRANSACTION;
});

export const getMiddleNamesDictionary = createSelector(dictionaryStateSelector, (state) => {
	const transaction = state[EDictionaryNameList.Names];
	if (transaction) {
		return {
			...transaction,
			result: transaction.result.filter((item: INamesDictionary) => item.type === 1),
		};
	}

	return DEFAULT_TRANSACTION;
});

export const getPersonTypesDocDictionary = createSelector(dictionaryStateSelector, (state) => {
	const transaction = state[EDictionaryNameList.DocSubTypes];
	if (transaction) {
		return { ...transaction, result: transaction.result.filter((item: any) => item.type === 1) };
	}

	return DEFAULT_TRANSACTION;
});

export const getAmdTypesDictionary = createSelector(dictionaryStateSelector, (state) => {
	return state[EDictionaryNameList.SpoTypes] || DEFAULT_TRANSACTION;
});

export const getEducTypeDocDictionary = createSelector(dictionaryStateSelector, (state) => {
	const transaction = state[EDictionaryNameList.DocSubTypes];
	if (transaction) {
		return { ...transaction, result: transaction.result.filter((item: any) => item.type === 2) };
	}

	return DEFAULT_TRANSACTION;
});

export const getNeedDocuments = createSelector(
	dictionaryStateSelector,
	isForeignerSelector,
	applicationsFormSelector,
	educationFormSelector,
	(dictionaries, isForeigner, applicationsForm, education) => {
		const needSpravka = applicationsForm.applications.some((item) => item.admGroup.NEED_DOC > 0);

		const isComplexDoc = education.document.subType?.complex === 1;

		const needDocuments = [
			...(needSpravka ? [DOCUMENT_TYPE.SPRAVKA_086] : []),
			...(isComplexDoc
				? [DOCUMENT_TYPE.DIPLOMA_F_SIDE_MARKS, DOCUMENT_TYPE.DIPLOMA_S_SIDE_MARKS]
				: []),
		];

		const dictionary: IDictionary[] = dictionaries[EDictionaryNameList.DocTypes]
			? dictionaries[EDictionaryNameList.DocTypes].result
			: [];

		return dictionary.filter((item: IDictionary) => {
			return (isForeigner && item?.need_foreigner !== 0) || needDocuments.includes(item.id);
		});
	},
);

export const getPrevEducTypesDocDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.PreviousEducation] || DEFAULT_TRANSACTION,
);

export const getSubTypesDocDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.DocSubTypes] || DEFAULT_TRANSACTION,
);

export const getDocTypesDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.DocTypes] || DEFAULT_TRANSACTION,
);

export const getCheatTypesDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.CheatTypes] || DEFAULT_TRANSACTION,
);

export const getGovernmentDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.Governments] || DEFAULT_TRANSACTION,
);
