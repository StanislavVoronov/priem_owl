import { createAction } from 'redux-actions';
import { ChangeEvent } from 'react';
import { IDocument, IDocumentsForm, ISelectItem } from '$common';

const NAMESPACE = 'EnrollDocumentsForm';

export const submitDocumentsForm = createAction(`${NAMESPACE}/submitDocumentsForm`, (values: IDocumentsForm) => values);
export const setPriemGroupNeedDocument = createAction(
	`${NAMESPACE}/priemGroupNeedDocAction`,
	(value: boolean) => value,
);
