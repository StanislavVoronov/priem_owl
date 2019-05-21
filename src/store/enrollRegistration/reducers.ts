import { handleActions } from 'redux-actions';

import { checkPayload, Gender, IEnrollRegisterForm, IServerError, IUpdateTextInputAction } from '$common';
import { updateEnrollRegistrationTextInput } from './actions';

const enrollRegistration = handleActions<IEnrollRegisterForm, IUpdateTextInputAction>(
	{
		[updateEnrollRegistrationTextInput.toString()]: (state: IEnrollRegisterForm, action) =>
			checkPayload(action, (payload: IUpdateTextInputAction) => {
				return { ...state, data: { ...state.data, [action.payload!.field.name]: action.payload!.field.value } };
			}),
	},
	{
		data: {
			lastName: '',
			middleName: '',
			firstName: '',
			birthday: '',
			gender: Gender.None,
			login: '',
			password: '',
			repeatPassword: '',
		},
		validation: {
			lastName: '',
			middleName: '',
			firstName: '',
			birthday: '',
			gender: '',
			login: '',
			password: '',
			repeatPassword: '',
		},
		statusValidation: false,
	},
);

export default enrollRegistration;
