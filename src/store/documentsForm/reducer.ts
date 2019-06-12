import { handleActions } from 'redux-actions';
import { IDocumentsForm } from '$common';
import { submitDocumentsForm } from './actions';

const enrollDocumentsFormReducer = handleActions<IDocumentsForm, IDocumentsForm>(
	{
		[submitDocumentsForm.toString()]: (state, action) => {
			return {
				...state,
				...action.payload,
			};
		},
	},
	{
		documents: [],
	},
);

export default enrollDocumentsFormReducer;
