import { createAction } from '@black_bird/utils';
import { IApplication, IPriemGroup, IDictionary, IAdmDictionaryItem } from '$common';
import { IFormField } from '@black_bird/components';

const NAMESPACE = 'APPLICATION_FORM';

export const addPriemApplication = createAction(
	`${NAMESPACE}/addPriemApplication`,
	(application: IApplication) => application,
);

export const onChangeFilialAction = createAction(`${NAMESPACE}/changeCurrentFilial`, (item: IFormField<IAdmDictionaryItem>) => item.value);

export const changeCurrentInstitute = createAction(
	`${NAMESPACE}/changeCurrentInstitute`,
	(value: IAdmDictionaryItem) => value,
);



export const changeCurrentDirection = createAction(
	`${NAMESPACE}/changeCurrentDirection`,
	(value: IAdmDictionaryItem) => value,
);

export const changeCurrentProfile = createAction(`${NAMESPACE}/changeCurrentProfile`, (value: IAdmDictionaryItem) => value);

export const onChangeEducFormAction = createAction(
	`${NAMESPACE}/changeCurrentEducationForm`,
	(item: IFormField<IAdmDictionaryItem[]>) => item.value,
);

export const changeCurrentEducationLevel = createAction(
	`${NAMESPACE}/changeEducationLevel`,
	(value: IAdmDictionaryItem) => value,
);

export const changeCurrentPayForm = createAction(
	`${NAMESPACE}/changeCurrentPayForm`,
	(values: IAdmDictionaryItem[]) => values,
);
export const deleteApplication = createAction(`${NAMESPACE}/deleteApplication`, (index: number) => index);
export const updatePriemGroups = createAction(`${NAMESPACE}/updatePriemGroups`, (values: IPriemGroup[]) => values);

export const submitApplicationFormAction = createAction(`${NAMESPACE}/SUBMIT`);