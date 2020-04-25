import React from 'react';
import { RadioButtonGroup } from '$components';
import { TextInput, IFormProps, Autocomplete, IFormField } from '@black_bird/components';
import { has, ITransaction, prop } from '@black_bird/utils';
import { validateRequireTextField, INamesDictionary, IRegForm } from '$common';
import classes from './RegForm.module.css';

export const GENDERS = [
	{ value: '1', label: 'Муж.', color: 'primary' },
	{ value: '2', label: 'Жен.' },
];

interface IProps {
	firstNameDictionary: ITransaction<INamesDictionary[]>;
	middleNameDictionary: ITransaction<INamesDictionary[]>;
	form: IFormProps<IRegForm>;
	email?: string;
}

const RegFormView = (props: IProps) => {
	const { firstNameDictionary, email, middleNameDictionary } = props;
	const { onChange, values, errors } = props.form;
	const defaultOnChange = (data: IFormField<string>) => {
		const genderName = firstNameDictionary.result.find((item) => item.name === data.value);

		if (genderName) {
			onChange(data, [{ name: 'gender', value: String(genderName.sex) }]);
		} else {
			onChange(data);
		}
	};

	const gender = prop('gender', values);

	const filterMiddleNames = (items: any, state: any) => {
		return prop('firstName')(values)
			? items.filter((item: { sex: number; name: string }) => {
					const includes = item.name.includes(state.inputValue);

					return gender ? item.sex === Number(gender) && includes : includes;
			  })
			: items;
	};

	return (
		<>
			<TextInput
				onChange={onChange}
				defaultValue={values.lastName}
				required
				name="lastName"
				label="Фамилия"
				placeholder="Введите фамилию"
			/>

			<Autocomplete
				error={has('firstName')(errors)}
				helperText={errors?.firstName}
				title="Имя"
				defaultValue={values.firstName}
				onChange={defaultOnChange}
				name="firstName"
				required
				placeholder="Введите имя"
				options={firstNameDictionary.result}
			/>

			<Autocomplete
				title="Отчество"
				error={has('middleName')(errors)}
				helperText={errors?.middleName}
				defaultValue={values.middleName}
				onChange={defaultOnChange}
				name="middleName"
				filterOptions={filterMiddleNames}
				placeholder="Введите отчество"
				options={middleNameDictionary.result}
			/>

			<TextInput
				onChange={onChange}
				validate={validateRequireTextField}
				required
				error={has('birthday')(errors)}
				helperText={errors?.birthday}
				name="birthday"
				value={values.birthday}
				label="Дата рождения"
				placeholder="дд.мм.гггг"
				type="date"
			/>

			<RadioButtonGroup
				error={has('gender')(errors)}
				helperText={errors?.gender}
				value={values.gender}
				onChange={onChange}
				validate={validateRequireTextField}
				name="gender"
				title="Пол"
				required
				items={GENDERS}
			/>
			{email && (
				<>
					<div className={classes.title}>
						Личное дело абитуриента существует в приемной комиссии
					</div>
					<TextInput
						name="verAccountCode"
						onChange={onChange}
						value={values.verAccountCode}
						required
						label="Код подтверждения"
						helperText={`Код подтверждения был напрален на электронную почту: ${email}`}
					/>
				</>
			)}
		</>
	);
};
export default RegFormView;
