import { handleActions } from 'redux-actions';
import { defaultDocument, defaultEnrollPersonForm, IChangeFieldAction, IEnrollPersonForm, IForm } from '$common';
import {
	addPersonPhoto,
	onChangeApplyPersonDataStatus,
	onChangeBirthPlace,
	onChangeCodeDepartment,
	onChangeGovernment,
	removePersonPhoto,
	updatePersonDocument,
} from './actions';

const enrollPersonReducer = handleActions<IForm<IEnrollPersonForm>, IChangeFieldAction>(
	{
		[onChangeBirthPlace.toString()]: (state, action) => {
			return { ...state, data: { ...state.data, birthPlace: action.payload.field.value } };
		},
		[onChangeGovernment.toString()]: (state, action) => {
			return {
				...state,
				data: {
					...state.data,
					personDocument: { ...state.data.personDocument, docGovernment: action.payload!.field.value },
				},
			};
		},
		[addPersonPhoto.toString()]: (state, action) => {
			return { ...state, data: { ...state.data, photo: action.payload.field.value } };
		},
		[removePersonPhoto.toString()]: state => {
			return { ...state, data: { ...state.data, photo: null } };
		},
		[onChangeCodeDepartment.toString()]: (state, action) => {
			return {
				...state,
				data: {
					...state.data,
					personDocument: { ...state.data.personDocument, codeDepartment: action.payload.field.value },
				},
			};
		},
		[updatePersonDocument.toString()]: (state, action) => {
			return { ...state, data: { ...state.data, personDocument: action.payload.field.value } };
		},
		[onChangeApplyPersonDataStatus.toString()]: state => {
			return { ...state, data: { ...state.data, isApplyPersonData: !state.data.isApplyPersonData } };
		},
	},
	{
		data: defaultEnrollPersonForm,
		statusValidation: false,
	},
);

export default enrollPersonReducer;
