import { createAction } from '@black_bird/utils';
import { IEnrollEducationForm } from '$common';

const NAMESPACE = 'EnrollEducationForm';

export const submitEnrollEducationForm = createAction<IEnrollEducationForm>(`${NAMESPACE}/submitEnrollEducationForm`);
