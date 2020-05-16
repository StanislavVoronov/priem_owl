import { defaultPersonForm, IPersonForm } from '$common';
import { initPersonFormAction, submitPersonFormAction } from './actions';
import { combineActions, createReducer, forAction } from '@black_bird/utils';

const personFormReducer = createReducer<IPersonForm>(
	[
		forAction(
			combineActions(submitPersonFormAction, initPersonFormAction),
			(state, payload) => payload,
		),
	],
	defaultPersonForm,
);

export default personFormReducer;
