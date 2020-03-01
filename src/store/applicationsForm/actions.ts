import { createAction } from '@black_bird/utils';
import { IApplication, IPriemGroup, ISelectItem } from '$common';
import { IFormField } from '@black_bird/components';

const NAMESPACE = 'APPLICATION_FORM';

export const addPriemApplication = createAction(
	`${NAMESPACE}/addPriemApplication`,
	(application: IApplication) => application,
);

export const onChangeFilialAction = createAction(`${NAMESPACE}/changeCurrentFilial`, (item: IFormField<ISelectItem>) => item.value);

export const changeCurrentInstitute = createAction(
	`${NAMESPACE}/changeCurrentInstitute`,
	(value: ISelectItem) => value,
);



export const changeCurrentDirection = createAction(
	`${NAMESPACE}/changeCurrentDirection`,
	(value: ISelectItem) => value,
);

export const changeCurrentProfile = createAction(`${NAMESPACE}/changeCurrentProfile`, (value: ISelectItem) => value);

export const onChangeEducFormAction = createAction(
	`${NAMESPACE}/changeCurrentEducationForm`,
	(item: IFormField<ISelectItem[]>) => item.value,
);

export const changeCurrentEducationLevel = createAction(
	`${NAMESPACE}/changeEducationLevel`,
	(value: ISelectItem) => value,
);

export const changeCurrentPayForm = createAction(
	`${NAMESPACE}/changeCurrentPayForm`,
	(values: ISelectItem[]) => values,
);
export const deleteApplication = createAction(`${NAMESPACE}/deleteApplication`, (index: number) => index);
export const updatePriemGroups = createAction(`${NAMESPACE}/updatePriemGroups`, (values: IPriemGroup[]) => values);

export const submitApplicationFormAction = createAction(`${NAMESPACE}/SUBMIT`);