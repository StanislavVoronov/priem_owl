import { createSelector } from 'reselect';
import { IRootState } from './models';

const dictionariesCreateSelector = (state: IRootState) => state.dictionaries;

export const dictionariesStateSelector = createSelector(
	dictionariesCreateSelector,
	(dictionaries): any => dictionaries,
);
