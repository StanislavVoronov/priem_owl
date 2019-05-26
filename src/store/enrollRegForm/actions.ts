import { createAction } from 'redux-actions';
import { ChangeEvent } from 'react';

const NAMESPACE = 'EnrollRegistrationForm';

export const onChangeTextInput = createAction(
	`${NAMESPACE}/updateFormInputField`,
	(event: ChangeEvent<HTMLInputElement>) => ({ field: event.target }),
);

export const onChangeMiddleName = createAction(`${NAMESPACE}/onChangeMiddleName`, (value: string) => value);

export const onChangeGender = createAction(`${NAMESPACE}/onChangeGender`, (value: number) => value);

export interface IChangeFirstNameAction {
	firstName: string;
	gender: number;
}
export const changeFirstName = createAction(
	`${NAMESPACE}/changeFirstName`,
	(firstName: string, gender: number): IChangeFirstNameAction => ({ firstName, gender }),
);

export const changeLogin = createAction(`${NAMESPACE}/changeLogin`, (event: ChangeEvent<HTMLInputElement>) => ({
	field: event.target,
}));
