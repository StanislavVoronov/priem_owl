import { handleActions } from 'redux-actions';

import { enrollSubmitRegFormAction } from './actions';

const enrollRegistrationReducer = handleActions(
	{
		[enrollSubmitRegFormAction.toString()]: (state, action) => ({ ...state, ...action.payload }),
	},
	{
		lastName: '',
		middleName: '',
		firstName: '',
		birthday: '',
		gender: 0,
	},
);

export default enrollRegistrationReducer;
