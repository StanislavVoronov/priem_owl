import { createAction } from 'redux-actions';
import { IDocument, ISelectItem } from '$common';

const NAMESPACE = 'EnrollEducationForm';

export const updateEducationDocument = createAction(
	`${NAMESPACE}/updateEducationDocument`,
	(document: IDocument) => document,
);
export const selectPersonCoolnessTypes = createAction(
	`${NAMESPACE}/selectPersonCoolnessTypes`,
	(coolnessTypes: ISelectItem[]) => coolnessTypes,
);
export const toggleHasEgeStatus = createAction(`${NAMESPACE}/toggleHasEgeStatus`, () => void 0);

export const toggleFirstHighEducationStatus = createAction(`${NAMESPACE}/toggleFirstHighEducationStatus`, () => void 0);
