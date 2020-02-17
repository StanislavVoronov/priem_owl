import { createAction } from 'redux-actions';
import { IContactsForm } from '$common';

const NAMESPACE = 'EnrollContactsForm';

export const submitEnrollContactsForm = createAction(
	`${NAMESPACE}/submitEnrollContactsForm`,
	(form: IContactsForm) => form,
);
