import { createAction } from 'redux-actions';
import { IEnrollRegForm } from '$common';

const NAMESPACE = 'RegistrationForm';

export const enrollSubmitRegFormAction = createAction(`${NAMESPACE}/submitRegForm`, (data: IEnrollRegForm) => ({
	...data,
}));
