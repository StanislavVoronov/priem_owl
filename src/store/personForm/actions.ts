import { createAction } from 'redux-actions';
import { ChangeEvent } from 'react';
import { IDocument, ISelectItem } from '$common';

const NAMESPACE = 'PersonForm';

export const updatePersonDocument = createAction(`${NAMESPACE}/updatePersonDocument`, (document: IDocument) => ({
	field: { value: document },
}));

export const onChangeBirthPlace = createAction(
	`${NAMESPACE}/onChangeBirthPlace`,
	(event: ChangeEvent<HTMLInputElement>) => ({ field: event.target }),
);

export const onChangeCodeDepartment = createAction(
	`${NAMESPACE}/onChangeCodeDepartment`,
	(event: ChangeEvent<HTMLInputElement>) => ({ field: event.target }),
);

export const onChangeGovernment = createAction(`${NAMESPACE}/onChangeGovernment`, (value: ISelectItem) => ({
	field: value,
}));

export const addPersonPhoto = createAction(`${NAMESPACE}/addPersonPhoto`, (file: File) => ({
	field: { value: file },
}));

export const removePersonPhoto = createAction(`${NAMESPACE}/removePersonPhoto`, () => void 0);

export const onChangeApplyPersonDataStatus = createAction(`${NAMESPACE}/onChangeApplyPersonDataStatus`, () => void 0);
