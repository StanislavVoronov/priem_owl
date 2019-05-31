import { createTransactionReducer, uploadDocumentActions, uploadDocumentsActions } from '$common';

import { combineActions, handleActions } from 'redux-actions';

const uploadDocumentReducer = createTransactionReducer(uploadDocumentActions);

const uploadDocumentsReducer = handleActions(
	{
		// @ts-ignore
		[combineActions(uploadDocumentsActions.request, uploadDocumentsActions.success, uploadDocumentsActions.failure)]: (
			state: any,
			action: any,
		) => {
			if (!(action.payload && action.payload.id)) {
				return state;
			}
			console.log('state', action, state);

			return {
				...state,
				[action.payload.id]: uploadDocumentReducer(state.uploadDocuments[action.payload.id], action),
			};
		},
	},
	{},
);

export default uploadDocumentsReducer;
