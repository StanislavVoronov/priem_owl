import { createReducer, forAction, combineReducers, combineActions } from '@black_bird/utils';
import { goToNextStep, navigateToStep } from './actions';
import { submitPersonFormAction } from '../personForm';
import { submitContactsFormAction } from '../contactsForm';
import { submitEducationFormAction } from '../educationForm';
import { submitDocumentsFormAction } from '../documentsForm';
import { submitApplicationFormAction } from '../applicationsForm';

const enrollReducerNextStep = createReducer(
	[
		forAction(
			combineActions(
				goToNextStep,
				submitPersonFormAction,
				submitContactsFormAction,
				submitEducationFormAction,
				submitDocumentsFormAction,
				submitApplicationFormAction,
			),
			(state) => {
				return state + 1;
			},
		),
		forAction(navigateToStep, (state, payload) => {
			return payload;
		}),
	],
	0,
);

const enrollReducerPassedStep = createReducer(
	[
		forAction(
			combineActions(
				goToNextStep,
				submitPersonFormAction,
				submitContactsFormAction,
				submitEducationFormAction,
				submitDocumentsFormAction,
				submitApplicationFormAction,
			),
			(state) => {
				return state + 1;
			},
		),
	],
	0,
);

export default combineReducers({ step: enrollReducerNextStep, passedStep: enrollReducerPassedStep });
