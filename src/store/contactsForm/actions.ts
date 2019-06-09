import { createAction } from 'redux-actions';
import { IEnrollContactsForm } from '$common';

const NAMESPACE = 'EnrollContactsForm';

export const submitEnrollContactsForm = createAction(
	`${NAMESPACE}/submitEnrollContactsForm`,
	(form: IEnrollContactsForm) => form,
);
