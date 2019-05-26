import { createAction } from 'redux-actions';
import { ChangeEvent } from 'react';
import { IDocument, ISelectItem } from '$common';

const NAMESPACE = 'EnrollContactsForm';

export const updateContactsForm = createAction(
	`${NAMESPACE}/updateTextInputField`,
	(event: ChangeEvent<HTMLInputElement>) => event.target,
);

export const updateRegDocument = createAction(`${NAMESPACE}/updateRegDocument`, (document: IDocument) => document);
export const toggleLiveAddressStatus = createAction(`${NAMESPACE}/toggleLiveAddressStatus`, () => void 0);
export const toggleNeedDormitoryStatus = createAction(`${NAMESPACE}/toggleNeedDormitoryStatus`, () => void 0);
export const selectMobileGovernment = createAction(
	`${NAMESPACE}/selectMobileGovernment`,
	(government: ISelectItem) => government,
);
