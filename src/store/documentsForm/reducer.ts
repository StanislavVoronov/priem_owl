import { handleActions } from 'redux-actions';
import { defaultDocument, IDocumentsForm, IForm } from '$common';
import { updateDocument, removeDocument, addDocument, selectCheatType } from './actions';

const enrollDocumentsFormReducer = handleActions<IForm<IDocumentsForm>, any>(
	{
		[updateDocument.toString()]: (state, action) => {
			return {
				...state,
				data: {
					...state.data,
					documents: state.data.documents.map((item, index) => {
						if (index === action.payload.key) {
							return action.payload.document;
						}

						return item;
					}),
				},
			};
		},
		[removeDocument.toString()]: (state, action) => {
			return {
				...state,
				data: { ...state.data, documents: state.data.documents.filter((item, index) => action.payload !== index) },
			};
		},
		[selectCheatType.toString()]: (state, action) => {
			return {
				...state,
				data: { ...state.data, cheatType: action.payload },
			};
		},
		[addDocument.toString()]: state => {
			return { ...state, data: { ...state.data, documents: [...state.data.documents, defaultDocument] } };
		},
	},
	{
		data: { documents: [], cheatType: null },
		statusValidation: false,
	},
);

export default enrollDocumentsFormReducer;
