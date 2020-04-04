import { createSelector } from '@black_bird/utils';
import { DOCUMENT_TYPE, EDictionaryNameList, IDocType, IDocument, validateDocument } from '$common';
import { IRootState } from '../models';
import { applicationsFormSelector, isForeignerSelector } from './formSelectors';
import { DEFAULT_TRANSACTION } from './defaults';

export const dictionaryStateSelector = (state: IRootState) => {
	return state.dictionaries;
};

export const getFirstNamesDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.FirstNames] || DEFAULT_TRANSACTION,
);

export const getMiddleNamesDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.MiddleNames] || DEFAULT_TRANSACTION,
);

export const getPersonTypesDocDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.PersonDocTypes] || DEFAULT_TRANSACTION,
);

export const getEducTypeDocDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.EducationDocTypes] || DEFAULT_TRANSACTION,
);

export const getNeedDocuments = createSelector(
	dictionaryStateSelector,
	isForeignerSelector,
	applicationsFormSelector,
	(dictionaries, isForeigner, applicationsForm) => {
		const needSpravka = applicationsForm.applications.some((item) => item.admGroup.NEED_DOC > 0);

		const needDocuments = [DOCUMENT_TYPE.DIPLOMA_F_SIDE_MARKS, DOCUMENT_TYPE.DIPLOMA_S_SIDE_MARKS];

		if (needSpravka) {
			needDocuments.push(DOCUMENT_TYPE.SPRAVKA_086);
		}

		const dictionary = dictionaries[EDictionaryNameList.DocTypes]
			? dictionaries[EDictionaryNameList.DocTypes].result
			: [];

		return dictionary.filter((item: IDocType) => {
			return (isForeigner && item?.need_foreigner) || needDocuments.includes(item.id);
		});
	},
);

export const getPrevEducTypesDocDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.PreviousEducation] || DEFAULT_TRANSACTION,
);

export const getDocTypesDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.DocTypes] || DEFAULT_TRANSACTION,
);

export const getGovernmentDictionary = createSelector(
	dictionaryStateSelector,
	(state) => state[EDictionaryNameList.Governments] || DEFAULT_TRANSACTION,
);
