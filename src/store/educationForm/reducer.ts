import { handleActions } from 'redux-actions';
import { defaultEducationDataForm, IEnrollEducationForm, IForm } from '$common';
import { toggleFirstHighEducationStatus, toggleHasEgeStatus, updateEducationDocument } from './actions';

const educationFormReducer = handleActions<IForm<IEnrollEducationForm>, any>(
	{
		[updateEducationDocument.toString()]: (state, action) => {
			return { ...state, data: { ...state.data, educationDocument: action.payload } };
		},
		[toggleFirstHighEducationStatus.toString()]: state => {
			return { ...state, data: { ...state.data, firstHighEducation: !state.data.firstHighEducation } };
		},
		[toggleHasEgeStatus.toString()]: state => {
			return { ...state, data: { ...state.data, hasEge: !state.data.hasEge } };
		},
	},
	{
		data: defaultEducationDataForm,
		statusValidation: false,
	},
);

export default educationFormReducer;
