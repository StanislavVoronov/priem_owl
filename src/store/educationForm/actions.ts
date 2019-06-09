import { createAction } from 'redux-actions';
import { IEnrollEducationForm } from '$common';

const NAMESPACE = 'EnrollEducationForm';

export const submitEnrollEducationForm = createAction(
	`${NAMESPACE}/submitEnrollEducationForm`,
	(form: IEnrollEducationForm) => form,
);
