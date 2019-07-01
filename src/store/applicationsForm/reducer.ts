import { handleActions } from 'redux-actions';
import { IApplication, IEnrollApplicationsForm, ISelectItem } from '$common';
import {
	changeCurrentDirection,
	changeCurrentEducationForm,
	changeCurrentEducationLevel,
	changeCurrentFilial,
	changeCurrentInstitute,
	changeCurrentPayForm,
	changeCurrentProfile,
	addPriemApplication,
	deleteApplication,
} from './actions';

const applicationsFormReducer = handleActions<IEnrollApplicationsForm, any>(
	{
		[addPriemApplication.toString()]: (state, action) => {
			return {
				...state,
				applications: [...state.applications, action.payload],
				currentProfile: null,
				currentEducationForm: null,
				currentPayForm: null,
				currentDirection: null,
			};
		},
		[changeCurrentFilial.toString()]: (state, action) => {
			return {
				...state,
				currentFilial: action.payload,
				currentInstitute: null,
				currentEducationLevel: null,
				currentProfile: null,
				currentEducationForm: null,
				currentPayForm: null,
				currentDirection: null,
			};
		},
		[changeCurrentInstitute.toString()]: (state, action) => {
			return {
				...state,
				currentInstitute: action.payload,
				currentEducationLevel: null,
				currentProfile: null,
				currentEducationForm: null,
				currentPayForm: null,
				currentDirection: null,
			};
		},
		[changeCurrentEducationLevel.toString()]: (state, action) => {
			return {
				...state,
				currentEducationLevel: action.payload,
				currentProfile: null,
				currentEducationForm: null,
				currentPayForm: null,
				currentDirection: null,
			};
		},
		[changeCurrentDirection.toString()]: (state, action) => {
			return {
				...state,
				currentDirection: action.payload,
				currentProfile: null,
				currentEducationForm: null,
				currentPayForm: null,
			};
		},
		[changeCurrentProfile.toString()]: (state, action) => {
			return { ...state, currentProfile: action.payload, currentEducationForm: null, currentPayForm: null };
		},
		[changeCurrentPayForm.toString()]: (state, action) => {
			return { ...state, currentPayForm: action.payload };
		},
		[deleteApplication.toString()]: (state, action) => {
			return { ...state, applications: state.applications.filter((item, index) => index !== action.payload) };
		},
		[changeCurrentEducationForm.toString()]: (state, action) => {
			return {
				...state,
				currentEducationForm: action.payload,
				currentPayForm: null,
			};
		},
	},
	{
		applications: [],
		currentFilial: null,
		currentInstitute: null,
		currentEducationLevel: null,
		currentDirection: null,
		currentProfile: null,
		currentPayForm: null,
		currentEducationForm: null,
	},
);

export default applicationsFormReducer;
