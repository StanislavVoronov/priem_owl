import { handleActions } from 'redux-actions';
import { IAccountVerificationForm, IForm, inputValueAsString } from '$common';
import { onChangeVerificationCode } from './actions';

const enrollAccountVerificationFormReducer = handleActions<IForm<IAccountVerificationForm>, any>(
	{
		[onChangeVerificationCode.toString()]: (state, action) => {
			return {
				...state,
				data: { ...state.data, verificationCode: inputValueAsString(action.payload) },
			};
		},
	},
	{
		data: { verificationCode: '' },
		statusValidation: false,
	},
);

export default enrollAccountVerificationFormReducer;
