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
	disabledFreePayFormAction,
	openLigotaPriemAction,
	closeLigotaPriemAction,
} from './actions';
import { combineReducers, createReducer, forAction } from '@black_bird/utils';
import { IAdmGroup } from './models';
import { priemEducLevelsTransactionActions, priemFilialsTransactionActions } from '$store';

const filialReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeFilialAction, (state, payload) => payload)],
	null,
	{ cleanActions: [priemFilialsTransactionActions.trigger] },
);

const educLevelReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeEducLevelAction, (state, payload) => payload)],
	null,
	{ cleanActions: [priemFilialsTransactionActions.trigger, onChangeFilialAction] },
);

const profileReducer = createReducer<IAdmDictionaryItem[]>(
	[forAction(onChangeProfilesAction, (state, payload) => payload)],
	[],
	{
		cleanActions: [
			onChangeEducLevelAction,
			onChangeDirectionAction,
			newAdmGroupsAddedAction,
			priemFilialsTransactionActions.trigger,
		],
	},
);

const instituteReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeInstAction, (state, payload) => payload)],
	null,
	{
		cleanActions: [
			onChangeEducLevelAction,
			onChangeFilialAction,
			newAdmGroupsAddedAction,
			priemEducLevelsTransactionActions.success,
		],
	},
);

const directionReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeDirectionAction, (state, payload) => payload)],
	null,
	{
		cleanActions: [
			onChangeInstAction,
			onChangeFilialAction,
			onChangeEducLevelAction,
			newAdmGroupsAddedAction,
		],
	},
);

const payFormsReducer = createReducer<IAdmDictionaryItem[]>(
	[forAction(onChangePayFormsAction, (state, payload) => payload)],
	[],
	{
		cleanActions: [
			onChangeInstAction,
			onChangeFilialAction,
			onChangeDirectionAction,
			onChangeEducLevelAction,
			onChangeEducFormsAction,
			newAdmGroupsAddedAction,
		],
	},
);

const educFormsReducer = createReducer<IAdmDictionaryItem[]>(
	[forAction(onChangeEducFormsAction, (state, payload) => payload)],
	[],
	{
		cleanActions: [
			onChangeEducLevelAction,
			onChangeFilialAction,
			onChangeInstAction,
			onChangeDirectionAction,
			newAdmGroupsAddedAction,
		],
	},
);

const availablePayFormsReducers = createReducer<number[]>(
	[
		forAction(disabledFreePayFormAction, (state) => Array.from(new Set([...state, 14]))),
		forAction(openLigotaPriemAction, (state, payload) =>
			state.filter((item) => item !== 16 && item !== 20),
		),
		forAction(closeLigotaPriemAction, (state) => Array.from(new Set([...state, 16, 20]))),
	],

	[],
);

const admGroupsReducer = createReducer<IAdmGroup[]>(
	[
		forAction(newAdmGroupsAddedAction, (state, payload: IAdmGroup) => [...state, payload]),
		forAction(applicationDeletedAction, (state, payload: number) =>
			state.filter((item, index) => index !== payload),
		),
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
	disabledPayForms: availablePayFormsReducers,
});

export default applicationsFormReducer;
