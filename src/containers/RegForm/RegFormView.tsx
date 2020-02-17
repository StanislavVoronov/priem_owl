import React from 'react';
import { RadioButtonGroup } from '$components';
import { Form, TextInput, IFormProps } from '@black_bird/components';
import { prop } from '@black_bird/utils';
import {
	EDictionaryNameList,
	IRegForm,
	IServerError,
	prepareDictionarySuggestions,
	validateRequireTextField,
	validateRusTextField,
} from '$common';

export const GENDERS = [
	{ value: 1, label: 'Муж.', color: 'primary' },
	{ value: 2, label: 'Жен.' },
];

interface IProps {
	dictionaries: any;
	data: IRegForm;
	submit: (values: IRegForm) => void;
	error: IServerError | null;
	loading: boolean;
}
const getCode = prop('code');

const RegFormView = (props: IProps) => {
	// const onChangeFirstName = (form: any) => (value: string) => {
	// 	const firstNameDictionary = props.dictionaries[EDictionaryNameList.FirstNames];
	// 	const name = firstNameDictionary.values.find((item: any) => item.name === value);
	//
	// 	if (name) {
	// 		form.setFieldValue('gender', String(name.sex));
	// 	}
	// };
	const renderForm = (form: IFormProps<IRegForm>) => {
		const { onChange, values } = form;
		const { dictionaries } = props;
		// const dictionaryFirstNames = prepareDictionarySuggestions(dictionaries[EDictionaryNameList.FirstNames]);
		// const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];
		// const gender = prop('gender', form.values);
		//
		// const filteredDictionaryMiddleName = prepareDictionarySuggestions(
		// 	dictionaryMiddleNames
		// 		? gender
		// 			? {
		// 					values: dictionaryMiddleNames.values.filter((item: { sex: number }) => item.sex === Number(gender)),
		// 			  }
		// 			: dictionaryMiddleNames
		// 		: { values: [] },
		// );

		return (
			<>
				<TextInput onChange={onChange} required name="lastName" label="Фамилия" placeholder="Введите фамилию" />

				{/*<Autocomplete*/}
				{/*	title="Имя"*/}
				{/*	getOptionLabel={getCode}*/}
				{/*	onChange={onChangeFirstName(form)}*/}
				{/*	name="firstName"*/}
				{/*	//validate={validateRequireRusText}*/}
				{/*	required*/}
				{/*	placeholder="Введите имя"*/}
				{/*	options={dictionaryFirstNames}*/}
				{/*/>*/}

				{/*<Autocomplete*/}
				{/*	label="Отчество"*/}
				{/*	name="middleName"*/}
				{/*	validate={validateRusTextField}*/}
				{/*	placeholder="Введите отчество"*/}
				{/*	suggestions={filteredDictionaryMiddleName}*/}
				{/*/>*/}

				<TextInput
					onChange={onChange}
					validate={validateRequireTextField}
					required
					name="birthday"
					label="Дата рождения"
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

	return (
		<Form
			error={props.error}
			renderForm={renderForm}
			onSubmit={props.submit}
			initialValues={props.data}
			buttonText="Проверить"
		/>
	);
};
export default RegFormView;
