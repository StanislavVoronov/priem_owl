import { createReducer, forAction, combineReducers } from '@black_bird/utils';
import { gotToStep, handleNextStep } from './actions';

const enrollReducerNextStep = createReducer(
	[
		forAction(handleNextStep, (state, payload) => {
			return state + 1;
		}),
		forAction(gotToStep, (state, payload) => {
			return payload;
		}),
	],
	4,
);

const enrollReducerPassedStep = createReducer(
	[
		forAction(gotToStep, (state, payload) => {
			return payload;
		}),
		forAction(handleNextStep, (state, payload) => {
			return state + 1;
		}),
	],
	4,
);

export default combineReducers({ step: enrollReducerNextStep, passedStep: enrollReducerPassedStep });
