import { combineActions, createReducer, forAction } from '@black_bird/utils';
import { defaultEducationDataForm } from '$common';
import { initEducationFormAction, submitEducationFormAction } from './actions';

const educationFormReducer = createReducer(
	[
		forAction(
			combineActions(submitEducationFormAction, initEducationFormAction),
			(state, payload) => payload,
		),
	],
	defaultEducationDataForm,
);

export default educationFormReducer;
