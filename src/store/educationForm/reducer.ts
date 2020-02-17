import { handleActions } from 'redux-actions';
import { createReducer, forAction } from '@black_bird/utils';
import { defaultEducationDataForm, IEnrollEducationForm } from '$common';
import { submitEnrollEducationForm } from '$store';

const educationFormReducer = createReducer(
	[
		forAction(submitEnrollEducationForm, (state, payload) => {
			console.log('payload', payload);

			return { ...payload };
		}),
	],
	defaultEducationDataForm,
);

export default educationFormReducer;
