import { createSelector } from 'reselect';
import { IRootState } from '../../common';
import { IEnrollState } from './models';

const enrollCreateSelector = (state: IRootState) => state.enroll;

export const enrollStateSelector = createSelector(
	enrollCreateSelector,
	(enroll): IEnrollState => enroll,
);
