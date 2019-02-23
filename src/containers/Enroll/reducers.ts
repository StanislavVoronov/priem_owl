import { IRootState } from '../../common';

import { registerNewPerson } from './actions';
import { Action } from 'redux';
import { handleActions } from 'redux-actions';

const enrollNewPersonReducer = handleActions<any>(
	{
		[registerNewPerson.toString()]: (state, action: Action<any>) => {
			return {
				...state,
			};
		},
	},
	{},
);

export const enrollReducer = {
	personData: enrollNewPersonReducer,
};
