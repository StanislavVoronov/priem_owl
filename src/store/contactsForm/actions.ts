import { createAction } from '@black_bird/utils';
import { IContactsForm } from '$common';

const NAMESPACE = 'ContactsForm';

export const submitContactsFormAction = createAction(
	`${NAMESPACE}/SUBMIT`,
	(form: IContactsForm) => form,
);
