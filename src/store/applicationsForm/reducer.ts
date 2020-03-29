import { IApplicationForm, IDictionary, IAdmDictionaryItem } from '$common';
import {
	onChangeDirectionAction,
	onChangeProfilesAction,
	onChangeFilialAction,
	onChangeInstAction,
	onChangeEducFormsAction,
	onChangeEducLevelAction,
	onChangePayFormsAction,
	newAdmGroupsAddedAction,
	applicationDeletedAction,
	disabledPayFormsUpdated,
} from './actions';
import { combineActions, combineReducers, createReducer, forAction, byKeyReducer } from '@black_bird/utils';
import { IAdmGroup } from './models';
import { priemEducLevelsTransactionActions } from '$store';

const filialReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeFilialAction, (state, payload) => payload)],
	null,
);

const educLevelReducer = createReducer<IAdmDictionaryItem | null>(
	[
		forAction(onChangeEducLevelAction, (state, payload) => payload),
		forAction(combineActions(onChangeFilialAction), (state) => null),
	],
	null,
);

const profileReducer = createReducer<IAdmDictionaryItem[]>(
	[
		forAction(onChangeProfilesAction, (state, payload) => payload),
		forAction(
			combineActions(onChangeEducLevelAction, onChangeDirectionAction, newAdmGroupsAddedAction),
			(state, payload) => [],
		),
	],
	[],
);

const instituteReducer = createReducer<IAdmDictionaryItem | null>(
	[
		forAction(onChangeInstAction, (state, payload) => payload),
		forAction(
			combineActions(
				onChangeEducLevelAction,
				onChangeFilialAction,
				newAdmGroupsAddedAction,
				priemEducLevelsTransactionActions.success,
			),
			(state, payload) => null,
		),
	],
	null,
);

const directionReducer = createReducer<IAdmDictionaryItem | null>(
	[
		forAction(onChangeDirectionAction, (state, payload) => payload),
		forAction(
			combineActions(onChangeInstAction, onChangeFilialAction, onChangeEducLevelAction, newAdmGroupsAddedAction),
			(state) => null,
		),
	],
	null,
);

const payFormsReducer = createReducer<IAdmDictionaryItem[]>(
	[
		forAction(onChangePayFormsAction, (state, payload) => payload),
		forAction(
			combineActions(
				onChangeDirectionAction,
				onChangeEducLevelAction,
				onChangeEducFormsAction,
				newAdmGroupsAddedAction,
			),
			(state) => [],
		),
	],
	[],
);

const educFormsReducer = createReducer<IAdmDictionaryItem[]>(
	[
		forAction(onChangeEducFormsAction, (state, payload) => payload),
		forAction(
			combineActions(
				onChangeEducLevelAction,
				onChangeFilialAction,
				onChangeInstAction,
				onChangeDirectionAction,
				newAdmGroupsAddedAction,
			),
			(state) => [],
		),
	],
	[],
);

const disabledPayFormsReducer = createReducer<number[]>(
	[forAction(disabledPayFormsUpdated, (state, payload) => payload)],
	[16, 20],
);

const admGroupsReducer = createReducer<IAdmGroup[]>(
	[
		forAction(newAdmGroupsAddedAction, (state, payload: IAdmGroup) => [...state, payload]),
		forAction(applicationDeletedAction, (state, payload: number) => state.filter((item, index) => index !== payload)),
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
	applications: admGroupsReducer,
	disabledPayForms: disabledPayFormsReducer,
});

export default applicationsFormReducer;
