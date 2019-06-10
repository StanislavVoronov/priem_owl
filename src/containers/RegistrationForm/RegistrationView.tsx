import React from 'react';
import { Autocomplete, RadioButtonGroup, TextInput, LoadingText, H2, PriemForm } from '$components';
import {
	EDictionaryNameList,
	IEnrollRegForm,
	IInvalidData,
	IServerError,
	prepareDictionarySuggestions,
	validateRequireRusText,
	validateRequireTextField,
	prop,
	validateRusTextField,
	EnrollRegFormSchema,
	IEnrollPersonForm,
} from '$common';
import { FieldProps, FormikProps } from 'formik';

import { DictionaryState } from '@mgutm-fcu/dictionary';

export const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IProps {
	dictionaries: DictionaryState;
	data: IEnrollRegForm;
	submit: (values: IEnrollRegForm) => void;
	error: IServerError | null;
	loading: boolean;
	personExists: boolean;
}

const RegistrationView = (props: IProps) => {
	const onChangeFirstName = (form: FormikProps<IEnrollRegForm>) => (value: string) => {
		const firstNameDictionary = props.dictionaries[EDictionaryNameList.FirstNames];
		const name = firstNameDictionary.values.find(item => item.name === value);

		if (name) {
			form.setFieldValue('gender', String(name.sex));
		}
	};
	const renderForm = (form: FormikProps<IEnrollRegForm>) => {
		const { dictionaries } = props;
		const dictionaryFirstNames = prepareDictionarySuggestions(dictionaries[EDictionaryNameList.FirstNames]);
		const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];
		const gender = prop('gender', form.values);

		const filteredDictionaryMiddleName = prepareDictionarySuggestions(
			dictionaryMiddleNames
				? gender
					? {
							values: dictionaryMiddleNames.values.filter((item: { sex: number }) => item.sex === Number(gender)),
					  }
					: dictionaryMiddleNames
				: { values: [] },
		);

		return (
			<>
				<TextInput
					required
					validate={validateRequireRusText}
					name="lastName"
					label="Фамилия"
					placeholder="Введите фамилию"
				/>

				<Autocomplete
					label="Имя"
					onSelect={onChangeFirstName(form)}
					name="firstName"
					validate={validateRequireRusText}
					required
					placeholder="Введите имя"
					suggestions={dictionaryFirstNames}
				/>

				<Autocomplete
					label="Отчество"
					name="middleName"
					validate={validateRusTextField}
					placeholder="Введите отчество"
					suggestions={filteredDictionaryMiddleName}
				/>

				<TextInput validate={validateRequireTextField} required name="birthday" label="Дата рождения" type="date" />

				<RadioButtonGroup validate={validateRequireTextField} name="gender" title="Пол" required items={GENDERS} />
			</>
		);
	};

	return (
		<PriemForm
			loading={props.loading}
			loadingText="Проверка абитуриента"
			renderForm={renderForm}
			schema={EnrollRegFormSchema}
			onSubmit={props.submit}
			initialValues={props.data}
			buttonText="Проверить"
		/>
	);
};
export default RegistrationView;
