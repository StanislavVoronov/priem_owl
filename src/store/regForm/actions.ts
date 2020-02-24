import { createAction } from '@black_bird/utils';
import { IRegForm } from '$common';

const NAMESPACE = 'RegForm';

export const submitRegFormAction = createAction<IRegForm>(`${NAMESPACE}/submitRegForm`);

export const generateUserPasswordAction = createAction('GENERATE_USER_PASSWORD', (login: string) => login);
