import React, { ChangeEvent } from 'react';
import { Autocomplete, RadioButtonGroup, TextInput, LoadingText, H2, SubmitButton } from '$components';
import {
	EDictionaryNameList,
	IEnrollRegForm,
	IInvalidData,
	IServerError,
	validateRequireRusText,
	validateRequireTextField,
} from '$common';
import { Formik, Form, FormikProps } from 'formik';

import { DictionaryState } from '@mgutm-fcu/dictionary';

export const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IProps extends IInvalidData<IEnrollRegForm> {
	data: IEnrollRegForm;
	onChangeTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
	dictionaries: DictionaryState;
	onChangeMiddleName: (value: string) => void;
	onChangeGender: (value: number) => void;
	onChangeFirstName: (value: string) => void;
	onBlurTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
	submit: () => void;
	error: IServerError | null;
	loading: boolean;
}

const RegistrationView = (props: IProps) => {
	const onChangeGender = (_: any, gender: string) => {
		// this.props.onChangeGender(Number(gender));
	};

	const renderForm = (formikProps: FormikProps<IEnrollRegForm>) => {
		const { dictionaries, data } = props;
		const dictionaryFirstNames = dictionaries[EDictionaryNameList.FirstNames];
		const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];

		const filteredDictionaryMiddleName = dictionaryMiddleNames
			? data.gender
				? {
						values: dictionaryMiddleNames.values.filter((item: { sex: number }) => item.sex === data.gender),
				  }
				: dictionaryMiddleNames
			: { values: [] };

		return (
			<div className="flexColumn">
				<TextInput
					required
					validate={validateRequireRusText}
					name="lastName"
					label="Фамилия"
					placeholder="Введите фамилию"
				/>

				<Autocomplete label={'Имя'} name="firstName" required placeholder={'Введите имя'} suggestions={[]} />

				<Autocomplete label={'Отчество'} name="middleName" placeholder={'Введите отчество'} suggestions={[]} />

				<TextInput validate={validateRequireTextField} required name="birthday" label="Дата рождения" type="date" />

				<RadioButtonGroup value={'1'} title="Пол" required={true} values={GENDERS} onChange={onChangeGender} />

				<div style={{ marginTop: 24 }}>
					<SubmitButton>Проверить</SubmitButton>
				</div>
			</div>
		);
	};
	if (props.loading) {
		return <LoadingText>Проверка абитуриента</LoadingText>;
	}

	return (
		<Formik onSubmit={props.submit} validateOnBlur={false} validateOnChange={false} initialValues={{ ...props.data }}>
			{renderForm}
		</Formik>
	);
};
export default RegistrationView;
