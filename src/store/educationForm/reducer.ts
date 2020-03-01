import { createReducer, forAction } from '@black_bird/utils';
import { defaultEducationDataForm, IEducationForm } from '$common';
import { submitEducationFormAction } from './actions';

const educationFormReducer = createReducer(
	[forAction(submitEducationFormAction, (state, payload) => payload)],
	defaultEducationDataForm,
);

export default educationFormReducer;
