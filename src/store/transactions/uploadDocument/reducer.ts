import { createTransactionReducer, uploadDocumentsActions } from '$common';

import { combineActions, handleActions } from 'redux-actions';
import { ITransactionState } from '$store';

const uploadDocumentReducer = createTransactionReducer(uploadDocumentsActions);

export const updateDocumentSelector = (state: ITransactionState, id: string) => {
	return state.uploadDocuments[id];
};

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
				[action.payload.id]: uploadDocumentReducer(state[action.payload.id], action),
			};
		},
	},
	{},
);

export default uploadDocumentsReducer;
