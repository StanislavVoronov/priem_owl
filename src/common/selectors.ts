import { createSelector } from 'reselect';
import { IRootState } from './models';
import { IDictionary, IDictionaryStore } from '@mgutm-fcu/dictionary';

const dictionariesCreateSelector = (state: IRootState) => state.dictionaries;

export const dictionariesStateSelector = createSelector(
	dictionariesCreateSelector,
	(dictionaries): Record<string, IDictionary> => dictionaries,
);
