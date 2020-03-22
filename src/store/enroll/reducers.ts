import { createReducer, forAction, combineReducers } from '@black_bird/utils';
import { goToNextStep, navigateToStep } from './actions';

const enrollReducerNextStep = createReducer(
	[
		forAction(goToNextStep, (state) => {
			return state + 1;
		}),
		forAction(navigateToStep, (state, payload) => {
			return payload;
		}),
	],
	0,
);

const enrollReducerPassedStep = createReducer(
	[
		forAction(goToNextStep, (state) => {
			return state + 1;
		}),
	],
	0,
);

export default combineReducers({ step: enrollReducerNextStep, passedStep: enrollReducerPassedStep });
