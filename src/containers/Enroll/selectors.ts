import { createSelector } from 'reselect';
import { IRootState } from '../../common';
import { IEnrollFetchingDataReducer } from './models';

const enrollCreateSelector = (state: IRootState) => state.enroll;

export const enrollStateSelector = createSelector(
	enrollCreateSelector,
	(enroll): IEnrollFetchingDataReducer => enroll,
);
