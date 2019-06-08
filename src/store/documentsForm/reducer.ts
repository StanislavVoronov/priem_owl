import { handleActions } from 'redux-actions';
import { defaultDocument, IDocumentsForm, IForm } from '$common';
import { updateDocument, removeDocument, addDocument, selectCheatType } from './actions';

const enrollDocumentsFormReducer = handleActions<IDocumentsForm, any>(
	{
		[updateDocument.toString()]: (state, action) => {
			return {
				...state,
				documents: state.documents.map((item, index) => {
					if (index === action.payload.key) {
						return action.payload.document;
					}

					return item;
				}),
			};
		},
		[removeDocument.toString()]: (state, action) => {
			return {
				...state,
				documents: state.documents.filter((item, index) => action.payload !== index),
			};
		},
		[addDocument.toString()]: state => {
			return { ...state, documents: [...state.documents, defaultDocument] };
		},
	},
	{
		documents: [],
	},
);

export default enrollDocumentsFormReducer;
