import { createAction } from 'redux-actions';
import { ChangeEvent } from 'react';
import { IDocument, ISelectItem } from '$common';

const NAMESPACE = 'EnrollDocumentsForm';

export const updateDocument = createAction(`${NAMESPACE}/updateDocument`, (key: number, document: IDocument) => ({
	document,
	key,
}));

export const addDocument = createAction(`${NAMESPACE}/addDocument`, () => void 0);

export const removeDocument = createAction(`${NAMESPACE}/removeDocument`, (key: number) => key);

export const selectCheatType = createAction(`${NAMESPACE}/selectCheatType`, (value: ISelectItem) => value);
