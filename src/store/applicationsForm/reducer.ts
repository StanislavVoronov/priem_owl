import { IApplicationForm, ISelectItem } from '$common';
import {
	changeCurrentDirection,
	changeCurrentEducationLevel,
	onChangeFilialAction,
	changeCurrentInstitute,
	changeCurrentPayForm,
	changeCurrentProfile, onChangeEducFormAction,
} from './actions';
import { combineReducers, createReducer, forAction } from '@black_bird/utils';

const educLevelReducer = createReducer<ISelectItem | null>(
	[forAction(changeCurrentEducationLevel, (state, payload) => payload)],
	null,
);

const filialReducer = createReducer<ISelectItem | null>(
	[forAction(onChangeFilialAction, (state, payload) => payload)],
	null,
);

const profileReducer = createReducer<ISelectItem | null>(
	[forAction(changeCurrentProfile, (state, payload) => payload)],
	null,
);

const instituteReducer = createReducer<ISelectItem | null>(
	[forAction(changeCurrentInstitute, (state, payload) => payload)],
	null,
);

const directionReducer = createReducer<ISelectItem | null>(
	[forAction(changeCurrentDirection, (state, payload) => payload)],
	null,
);

const payFormsReducer = createReducer<ISelectItem[]>(
	[forAction(changeCurrentPayForm, (state, payload) => payload)],
	[],
);

const educFormsReducer = createReducer<ISelectItem[]>(
	[forAction(onChangeEducFormAction, (state, payload) => payload)],
	[],
);

const applicationsFormReducer = combineReducers<IApplicationForm>({
	filial: filialReducer,
	educLevel: educLevelReducer,
	educForms: educFormsReducer,
	payForms: payFormsReducer,
	direction: directionReducer,
	profile: profileReducer,
	institute: instituteReducer,
});

export default applicationsFormReducer;
