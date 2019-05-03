import { createSelector } from 'reselect';
import { IEnrollState } from './models';
import { IRootState } from '$store';

const enrollSelector = (state: IRootState) => state.enroll;

export const enrollStateSelector = createSelector(
	enrollSelector,
	(enroll): IEnrollState => enroll,
);

export const dictionariesSelector = (state: IRootState) => state.dictionaries;
