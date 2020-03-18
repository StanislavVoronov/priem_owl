import { defaultPersonForm, IPersonForm } from '$common';
import { submitPersonFormAction } from './actions';
import { createReducer, forAction } from '@black_bird/utils';

const personFormReducer = createReducer<IPersonForm>(
	[forAction(submitPersonFormAction, (state, payload) => payload)],
	defaultPersonForm,
);

export default personFormReducer;
