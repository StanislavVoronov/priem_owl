import { handleActions } from 'redux-actions';

import { checkPayload, IEnrollRegForm, IForm, IChangeFieldAction } from '$common';
import {
	IChangeFirstNameAction,
	changeFirstName,
	onChangeGender,
	onChangeMiddleName,
	updateRegFormTextInput,
} from './actions';

const enrollRegistrationReducer = handleActions<IForm<IEnrollRegForm>, IChangeFieldAction>(
	{
		[updateRegFormTextInput.toString()]: (state, action) =>
			checkPayload(action, (payload: IChangeFieldAction) => {
				return { ...state, data: { ...state.data, [payload.field.name]: payload.field.value } };
			}),
		[onChangeMiddleName.toString()]: (state, action) =>
			checkPayload(action, (payload: string) => {
				return { ...state, data: { ...state.data, middleName: payload } };
			}),
		[onChangeGender.toString()]: (state, action) =>
			checkPayload(action, (payload: number) => {
				return { ...state, data: { ...state.data, gender: payload } };
			}),
		[changeFirstName.toString()]: (state, action) =>
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
	},
);

export default enrollRegistrationReducer;
