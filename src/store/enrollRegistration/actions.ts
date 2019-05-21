import { createAction } from 'redux-actions';
import { ChangeEvent } from 'react';

const NAMESPACE = 'EnrollRegistration';

export const updateEnrollRegistrationTextInput = createAction(
	`${NAMESPACE}/updateFormInputField`,
	(event: ChangeEvent<HTMLInputElement>) => ({ field: event.target }),
);
