import { IRootState } from '$store';
import { createSelector } from '@black_bird/utils';
import { EDictionaryNameList } from '$common';
import { DEFAULT_TRANSACTION } from './defaults';

export const dictionaryStateSelector = (state: IRootState) => {
	return state.dictionaries;
};

export const firstNamesDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.FirstNames] || DEFAULT_TRANSACTION,
);

export const middleNamesDictionary = createSelector(
	dictionaryStateSelector,
	state => state[EDictionaryNameList.MiddleNames] || DEFAULT_TRANSACTION,
);

