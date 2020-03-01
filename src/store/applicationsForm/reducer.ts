import { IApplicationForm, IDictionary, IAdmDictionaryItem } from '$common';
import {
	changeCurrentDirection,
	changeCurrentEducationLevel,
	onChangeFilialAction,
	changeCurrentInstitute,
	changeCurrentPayForm,
	changeCurrentProfile, onChangeEducFormAction,
} from './actions';
import { combineReducers, createReducer, forAction } from '@black_bird/utils';

const educLevelReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(changeCurrentEducationLevel, (state, payload) => payload)],
	null,
);

const filialReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeFilialAction, (state, payload) => payload)],
	null,
);

const profileReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(changeCurrentProfile, (state, payload) => payload)],
	null,
);

const instituteReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(changeCurrentInstitute, (state, payload) => payload)],
	null,
);

const directionReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(changeCurrentDirection, (state, payload) => payload)],
	null,
);

const payFormsReducer = createReducer<IAdmDictionaryItem[]>(
	[forAction(changeCurrentPayForm, (state, payload) => payload)],
	[],
);

const educFormsReducer = createReducer<IAdmDictionaryItem[]>(
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
