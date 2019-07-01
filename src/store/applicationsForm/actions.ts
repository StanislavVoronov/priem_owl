import { createAction } from 'redux-actions';
import { IApplication, ISelectItem } from '$common';

const NAMESPACE = 'EnrollApplicationForm';

export const addPriemApplication = createAction(
	`${NAMESPACE}/addPriemApplication`,
	(application: IApplication) => application,
);

export const changeCurrentFilial = createAction(`${NAMESPACE}/changeCurrentFilial`, (value: ISelectItem) => value);

export const changeCurrentInstitute = createAction(
	`${NAMESPACE}/changeCurrentInstitute`,
	(value: ISelectItem) => value,
);

export const changeCurrentEducationLevel = createAction(
	`${NAMESPACE}/changeCurrentEducationLevel`,
	(value: ISelectItem) => value,
);

export const changeCurrentDirection = createAction(
	`${NAMESPACE}/changeCurrentDirection`,
	(value: ISelectItem) => value,
);

export const changeCurrentProfile = createAction(`${NAMESPACE}/changeCurrentProfile`, (value: ISelectItem) => value);

export const changeCurrentEducationForm = createAction(
	`${NAMESPACE}/changeCurrentEducationForm`,
	(value: ISelectItem) => value,
);

export const changeCurrentPayForm = createAction(`${NAMESPACE}/changeCurrentPayForm`, (value: ISelectItem) => value);
export const deleteApplication = createAction(`${NAMESPACE}/deleteApplication`, (index: number) => index);
