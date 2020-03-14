import { createReducer, forAction, combineReducers } from '@black_bird/utils';
import { defaultDocument, IDocument } from '$common';
import { admNeedDocChangedStatusAction, newDocumentAdded, submitDocumentsForm } from './actions';

const documentsReducer = createReducer<IDocument[]>(
	[forAction(submitDocumentsForm, (state, payload) => payload)],
	[defaultDocument],
);

const admNeedDocReducer = createReducer<boolean>(
	[forAction(admNeedDocChangedStatusAction, (state, payload) => payload)],
	false,
);

const documentsFormReducer = combineReducers({ needDocStatus: admNeedDocReducer, documents: documentsReducer });

export default documentsFormReducer;
