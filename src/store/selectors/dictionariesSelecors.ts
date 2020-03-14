import { createSelector } from '@black_bird/utils';
import { EDictionaryNameList, IDocument, validateDocument } from '$common';
import { IRootState } from '../models';
import { isForeignerSelector } from './formSelectors';
import { DEFAULT_TRANSACTION } from './defaults';


export const dictionaryStateSelector = (state: IRootState) => {
	return state.dictionaries;
};

export const getFirstNamesDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.FirstNames] || DEFAULT_TRANSACTION,
);

export const getMiddleNamesDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.MiddleNames] || DEFAULT_TRANSACTION,
);

export const getPersonTypesDocDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.PersonDocTypes] || DEFAULT_TRANSACTION,
);

export const getEducTypeDocDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.EducationDocTypes] || DEFAULT_TRANSACTION,
);

export const getNeedDocuments = createSelector(
	dictionaryStateSelector,
	isForeignerSelector,
	(dictionaries, isForeigner) => {
		const needDocuments = [9, 10];
		const dictionary = dictionaries[EDictionaryNameList.DocTypes] ? dictionaries[EDictionaryNameList.DocTypes].result : [];

		return dictionary.filter((item: IDocument) => {
			return validateDocument(item) && isForeigner
				? (item.type && item.type.need_foreigner) || needDocuments.includes(item.id)
				: needDocuments.includes(item.id);
		});
	},
);

export const getPrevEducTypesDocDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.PreviousEducation] || DEFAULT_TRANSACTION,
);

export const getDocTypesDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.DocTypes] || DEFAULT_TRANSACTION,
);

export const getGovernmentDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.Governments] || DEFAULT_TRANSACTION,
);
