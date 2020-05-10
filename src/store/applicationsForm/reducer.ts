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
	onChangeAdmTypeAction,
	cleanDefaultAdmTypeAction,
	newFetchPriemAppSuccessAction,
} from './actions';
import { combineReducers, createReducer, forAction } from '@black_bird/utils';
import { IAdmGroup } from './models';
import { submitDocumentsFormAction } from '../documentsForm';

const filialReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeFilialAction, (state, payload) => payload)],
	null,
	{ cleanActions: [submitDocumentsFormAction] },
);

const educLevelReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeEducLevelAction, (state, payload) => payload)],
	null,
	{ cleanActions: [onChangeFilialAction] },
);

const profileReducer = createReducer<IAdmDictionaryItem[]>(
	[forAction(onChangeProfilesAction, (state, payload) => payload)],
	[],
	{
		cleanActions: [
			onChangeEducLevelAction,
			onChangeInstAction,
			onChangeDirectionAction,
			newFetchPriemAppSuccessAction,
			onChangeAdmTypeAction,
		],
	},
);

const admTypeReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeAdmTypeAction, (state, payload) => payload)],
	null,
	{
		cleanActions: [cleanDefaultAdmTypeAction, onChangeEducLevelAction, onChangeFilialAction],
	},
);

const instituteReducer = createReducer<IAdmDictionaryItem | null>(
	[forAction(onChangeInstAction, (state, payload) => payload)],
	null,
	{
		cleanActions: [onChangeEducLevelAction, onChangeAdmTypeAction, onChangeFilialAction],
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
			onChangeAdmTypeAction,
			newFetchPriemAppSuccessAction,
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
			newFetchPriemAppSuccessAction,
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
			newFetchPriemAppSuccessAction,
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
	admType: admTypeReducer,
});

export default applicationsFormReducer;
