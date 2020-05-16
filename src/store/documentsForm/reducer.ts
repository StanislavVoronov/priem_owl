import { createReducer, forAction, combineReducers, combineActions } from '@black_bird/utils';
import { defaultDocument, IDocument } from '$common';
import {
	admNeedDocChangedStatusAction,
	initDocumentFormAction,
	newDocumentAdded,
	submitDocumentsFormAction,
} from './actions';

const documentsReducer = createReducer<IDocument[]>(
	[
		forAction(
			combineActions(submitDocumentsFormAction, initDocumentFormAction),
			(state, payload) => payload,
		),
	],
	[],
);

const admNeedDocReducer = createReducer<boolean>(
	[forAction(admNeedDocChangedStatusAction, (state, payload) => payload)],
	false,
);

const documentsFormReducer = combineReducers({
	needDocStatus: admNeedDocReducer,
	documents: documentsReducer,
});

export default documentsFormReducer;
