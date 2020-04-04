import { createAction } from '@black_bird/utils';
import { IEducationForm } from '$common';

const NAMESPACE = 'EducationForm';

export const submitEducationFormAction = createAction<IEducationForm>(
	`${NAMESPACE}/SUBMIT`,
	(form: IEducationForm) => form,
);

export const firstHighEducChanged = createAction(`${NAMESPACE}/FIRST_HIGH_EDUC_CHANGEd`, (value: boolean) => value);
