import { handleActions } from 'redux-actions';
import { IAccountVerificationForm, IForm, inputValueAsString } from '$common';
import { submitEnrollVerificationForm } from './actions';

const enrollAccountVerificationFormReducer = handleActions<IAccountVerificationForm, IAccountVerificationForm>(
	{
		[submitEnrollVerificationForm.toString()]: (state, action) => {
			return {
				...state,
				...action.payload,
			};
		},
	},
	{
		verificationCode: '',
	},
);

export default enrollAccountVerificationFormReducer;
