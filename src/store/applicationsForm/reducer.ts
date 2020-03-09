import { IApplicationForm, IDictionary, IAdmDictionaryItem } from '$common';
import {
	onChangeDirectionAction,
	onChangeProfilesAction,
	onChangeFilialAction,
	onChangeInstAction,
	onChangeEducFormsAction,
	onChangeEducLevelAction,
	onChangePayFormsAction,
	addPriemApplication,
	newPriemApplicationAdded,
} from './actions';
import { combineActions, combineReducers, createReducer, forAction, byKeyReducer } from '@black_bird/utils';

const filialReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeFilialAction, (state, payload) => payload)],
	null,
);

const educLevelReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeEducLevelAction, (state, payload) => payload)],
	null,
);

const profileReducer = createReducer<IAdmDictionaryItem[]>(
	[
		forAction(onChangeProfilesAction, (state, payload) => payload),
		forAction(combineActions(onChangeDirectionAction), (state, payload) => []),
	],
	[],
);

const instituteReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeInstAction, (state, payload) => payload)],
	null,
);

const directionReducer = createReducer<IAdmDictionaryItem | null>(
	[
		forAction(onChangeDirectionAction, (state, payload) => payload),
		forAction(combineActions(onChangeInstAction), state => null),
	],
	null,
);

const payFormsReducer = createReducer<IAdmDictionaryItem[]>(
	[
		forAction(onChangePayFormsAction, (state, payload) => payload),
		forAction(combineActions(onChangeDirectionAction), state => []),
	],
	[],
);

const educFormsReducer = createReducer<IAdmDictionaryItem[]>(
	[
		forAction(onChangeEducFormsAction, (state, payload) => payload),
		forAction(combineActions(onChangePayFormsAction), state => []),
	],
	[],
);

const applicationsFormReducer = combineReducers<IApplicationForm>({
	filial: filialReducer,
	educLevel: educLevelReducer,
	educForms: educFormsReducer,
	payForms: payFormsReducer,
	direction: directionReducer,
	profiles: profileReducer,
	institute: instituteReducer,
});

export default applicationsFormReducer;
