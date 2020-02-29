import React from 'react';
import { RadioButtonGroup } from '$components';
import { TextInput, IFormProps, Autocomplete, IFormField } from '@black_bird/components';
import { ITransaction, prop } from '@black_bird/utils';
import {
	validateRequireTextField,
	IFistNameDictionary,
} from '$common';

export const GENDERS = [
	{ value: '1', label: 'Муж.', color: 'primary' },
	{ value: '2', label: 'Жен.' },
];

interface IProps {
	firstNameDictionary: ITransaction<IFistNameDictionary>;
	middleNameDictionary: ITransaction<IFistNameDictionary>;
	form: IFormProps<any>;
}

const RegFormView = (props: IProps) => {
	const { firstNameDictionary, middleNameDictionary } = props;
	const { onChange, values } = props.form;

	// const onChangeFirstName = (form: any) => (value: string) => {
	// 	const firstNameDictionary = props.dictionaries[EDictionaryNameList.FirstNames];
	// 	const name = firstNameDictionary.values.find((item: any) => item.name === value);
	//
	// 	if (name) {
	// 		form.setFieldValue('gender', String(name.sex));
	// 	}
	// };
	const defaultOnChange = (data: IFormField<string>) => {
		const genderName = firstNameDictionary.result.find(item => item.name === data.value);

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
			<TextInput onChange={onChange} required name="lastName" label="Фамилия" placeholder="Введите фамилию" />

			<Autocomplete
				title="Имя"
				onChange={defaultOnChange}
				name="firstName"
				required
				placeholder="Введите имя"
				options={firstNameDictionary.result}
			/>

			<Autocomplete
				title="Имя"
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
				name="birthday"
				label="Дата рождения"
				placeholder="дд.мм.гггг"
				type="date"
			/>

			<RadioButtonGroup
				value={values.gender}
				onChange={onChange}
				validate={validateRequireTextField}
				name="gender"
				title="Пол"
				required
				items={GENDERS}
			/>
		</>
	);
};
export default RegFormView;
