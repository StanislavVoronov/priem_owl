import { handleActions } from 'redux-actions';

import { checkPayload, Gender, IEnrollRegisterStateForm, IServerError, IUpdateTextInputAction } from '$common';
import {
	IChangeFirstNameAction,
	changeFirstName,
	onChangeGender,
	onChangeMiddleName,
	onChangeTextInput,
} from './actions';

const enrollRegistration = handleActions<IEnrollRegisterStateForm, IUpdateTextInputAction>(
	{
		[onChangeTextInput.toString()]: (state: IEnrollRegisterStateForm, action) =>
			checkPayload(action, (payload: IUpdateTextInputAction) => {
				return { ...state, data: { ...state.data, [action.payload!.field.name]: action.payload!.field.value } };
			}),
		[onChangeMiddleName.toString()]: (state: IEnrollRegisterStateForm, action) =>
			checkPayload(action, (payload: string) => {
				return { ...state, data: { ...state.data, middleName: payload } };
			}),
		[onChangeGender.toString()]: (state: IEnrollRegisterStateForm, action) =>
			checkPayload(action, (payload: number) => {
				return { ...state, data: { ...state.data, gender: payload } };
			}),
		[changeFirstName.toString()]: (state: IEnrollRegisterStateForm, action) =>
			checkPayload(action, ({ firstName, gender }: IChangeFirstNameAction) => {
				return { ...state, data: { ...state.data, firstName, gender } };
			}),
	},
	{
		data: {
			lastName: '',
			middleName: '',
			firstName: '',
			birthday: '',
			gender: 0,
			login: '',
			password: '',
			repeatPassword: '',
		},
		statusValidation: false,
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
	},
);

export default enrollRegistration;
