import { createSelector } from 'reselect';
import { IRootState } from '../../common';
import { IEnrollReducer } from './models';

const enrollCreateSelector = (state: IRootState) => state.enroll;

export const enrollStateSelector = createSelector(
	enrollCreateSelector,
	(enroll): IEnrollReducer => enroll,
);
