import { handleActions } from 'redux-actions';
import { IDocumentsForm } from '$common';
import { setPriemGroupNeedDocument, submitDocumentsForm } from './actions';

const enrollDocumentsFormReducer = handleActions<IDocumentsForm, any>(
	{
		[submitDocumentsForm.toString()]: (state, action) => {
			return {
				...state,
				...action.payload,
			};
		},
		[setPriemGroupNeedDocument.toString()]: (state, action) => {
			return {
				...state,
				priemGroupNeedDocument: action.payload,
			};
		},
	},
	{
		documents: [],
		priemGroupNeedDoc: false,
	},
);

export default enrollDocumentsFormReducer;
