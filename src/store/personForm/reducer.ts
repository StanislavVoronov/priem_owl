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

const enrollPersonReducer = handleActions<IEnrollPersonForm, IChangeFieldAction>(
	{
		[addPersonPhoto.toString()]: (state, action) => {
			return { ...state, photo: action.payload.field.value };
		},
		[removePersonPhoto.toString()]: state => {
			return { ...state, photo: null };
		},
	},
	defaultEnrollPersonForm,
);

export default enrollPersonReducer;
