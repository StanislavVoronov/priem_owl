import { handleActions } from 'redux-actions';
import { IAccountVerificationForm, VerificationMethod } from '$common';
import { submitEnrollVerificationForm, selectVerificationMethod } from './actions';

const enrollAccountVerificationFormReducer = handleActions<IAccountVerificationForm, any>(
	{
		[submitEnrollVerificationForm.toString()]: (state, action) => {
			return {
				...state,
				verificationCode: action.payload,
			};
		},
		[selectVerificationMethod.toString()]: (state, action) => {
			return {
				...state,
				verificationMethod: action.payload,
			};
		},
	},
	{
		verificationMethod: VerificationMethod.None,
		verificationCode: '',
	},
);

export default enrollAccountVerificationFormReducer;
