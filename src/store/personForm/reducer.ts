import { handleActions } from 'redux-actions';
import { defaultDocument, defaultEnrollPersonForm, IChangeFieldAction, IEnrollPersonForm, IForm } from '$common';
import { addPersonPhoto, removePersonPhoto, submitEnrollPersonForm } from './actions';

const enrollPersonReducer = handleActions<IEnrollPersonForm, IChangeFieldAction>(
	{
		[submitEnrollPersonForm.toString()]: (state, action) => ({
			...state,
			...action.payload,
		}),
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
