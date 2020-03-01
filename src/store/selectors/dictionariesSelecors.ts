import { IRootState } from '$store';
import { createSelector } from '@black_bird/utils';
import { EDictionaryNameList } from '$common';
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

export const getPrevEducTypesDocDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.PreviousEducation] || DEFAULT_TRANSACTION,
);

export const getTypesDocsDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.DocTypes] || DEFAULT_TRANSACTION,
);

export const getGovernmentDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.Governments] || DEFAULT_TRANSACTION,
);


