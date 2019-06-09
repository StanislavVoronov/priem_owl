import { createAction } from 'redux-actions';
import { ChangeEvent } from 'react';
import { IDocument, IEnrollPersonForm, ISelectItem } from '$common';

const NAMESPACE = 'PersonForm';

export const submitEnrollPersonForm = createAction(
	`${NAMESPACE}/submitEnrollPersonForm`,
	(form: IEnrollPersonForm) => form,
);

export const addPersonPhoto = createAction(`${NAMESPACE}/addPersonPhoto`, (file: File) => ({
	field: { value: file },
}));

export const removePersonPhoto = createAction(`${NAMESPACE}/removePersonPhoto`, () => void 0);
