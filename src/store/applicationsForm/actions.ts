import { createAction } from '@black_bird/utils';
import { IApplication, IPriemGroup, IDictionary, IAdmDictionaryItem } from '$common';
import { IFormField } from '@black_bird/components';
import { IAdmGroup } from './models';

const NAMESPACE = 'APPLICATION_FORM';

export const addPriemApplication = createAction(
	`${NAMESPACE}/addPriemApplication`,
	(application: IApplication) => application,
);

export const onChangeFilialAction = createAction(
	`${NAMESPACE}/CHANGE_FILIAL`,
	(item: IFormField<IAdmDictionaryItem>) => item.value,
);

export const onChangeInstAction = createAction(
	`${NAMESPACE}/CHANGE_INSTITUTE`,
	(item: IFormField<IAdmDictionaryItem>) => item.value,
);

export const onChangeDirectionAction = createAction(
	`${NAMESPACE}/CHANGE_DIRECTION`,
	(item: IFormField<IAdmDictionaryItem>) => item.value,
);

export const onChangeProfilesAction = createAction(
	`${NAMESPACE}/changeCurrentProfile`,
	(item: IFormField<IAdmDictionaryItem[]>) => item.value,
);

export const onChangeEducFormsAction = createAction(
	`${NAMESPACE}/CHANGE_EDUC_FORMS`,
	(item: IFormField<IAdmDictionaryItem[]>) => item.value,
);

export const onChangeEducLevelAction = createAction(
	`${NAMESPACE}/CHANGE_EDUC_LEVEL`,
	(item: IFormField<IAdmDictionaryItem>) => item.value,
);

export const onChangePayFormsAction = createAction(
	`${NAMESPACE}/CHANGE_PAY_FORMS`,
	(item: IFormField<IAdmDictionaryItem[]>) => item.value,
);

export const applicationDeletedAction = createAction(`${NAMESPACE}/APPLICATION_DELETED`, (index: number) => index);
export const updatePriemGroups = createAction(`${NAMESPACE}/updatePriemGroups`, (values: IPriemGroup[]) => values);

export const newPriemAppAddedAction = createAction(`${NAMESPACE}/NEW_PRIEM_APPLICATION_ADDED`);

export const newAdmGroupsAddedAction = createAction(
	`${NAMESPACE}/NEW_ADM_GROUPS_ADDED`,
	(admGroup: IAdmGroup) => admGroup,
);

export const submitApplicationFormAction = createAction(`${NAMESPACE}/SUBMIT`);
