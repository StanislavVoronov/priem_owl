import { createAction } from '@black_bird/utils';
import { IRegForm } from '$common';

const NAMESPACE = 'RegForm';

export const submitRegFormAction = createAction<IRegForm>(`${NAMESPACE}/SUBMIT`);

export const generateUserPasswordAction = createAction(`${NAMESPACE}/GENERATE_USER_PASSWORD`, (login: string) => login);
