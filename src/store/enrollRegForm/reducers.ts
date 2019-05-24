import { handleActions } from 'redux-actions';

import { checkPayload, IEnrollRegisterStateForm, IUpdateTextInputAction } from '$common';
import {
	IChangeFirstNameAction,
	changeFirstName,
	onChangeGender,
	onChangeMiddleName,
	onChangeTextInput,
} from './actions';
import { IRootState } from '$store';

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
		},
		statusValidation: false,
		validation: {
			lastName: '',
			middleName: '',
			firstName: '',
			birthday: '',
			gender: '',
		},
	},
);

export const enrollRegistrationSelector = (state: IRootState) => {
	return state.enrollRegistration;
};

export default enrollRegistration;
