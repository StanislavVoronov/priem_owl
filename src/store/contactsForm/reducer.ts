import { handleActions } from 'redux-actions';
import { defaultEnrollContactsForm, IEnrollContactsForm, IForm } from '$common';
import { submitEnrollContactsForm } from './actions';

const enrollContactsFormReducer = handleActions<IEnrollContactsForm, IEnrollContactsForm>(
	{
		[submitEnrollContactsForm.toString()]: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
	defaultEnrollContactsForm,
);

export default enrollContactsFormReducer;
