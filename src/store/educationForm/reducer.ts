import { handleActions } from 'redux-actions';
import { defaultEducationDataForm, IEnrollEducationForm, IForm } from '$common';
import { submitEnrollEducationForm } from './actions';

const educationFormReducer = handleActions<IEnrollEducationForm, IEnrollEducationForm>(
	{
		[submitEnrollEducationForm.toString()]: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
	defaultEducationDataForm,
);

export default educationFormReducer;
