import { createAction } from '@black_bird/utils';
import { IPersonForm } from '$common';

const NAMESPACE = 'PersonForm';

export const submitPersonFormAction = createAction<IPersonForm>(
	`${NAMESPACE}/SUBMIT`
);