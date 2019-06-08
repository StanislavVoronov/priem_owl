import React from 'react';
import { Checkbox, WebPhoto, DocumentForm, TextInput, FormControlLabel, SubmitButton } from '$components';
import { object, string } from 'yup';

import {
	EDictionaryNameList,
	IEnrollPersonForm,
	IStylable,
	validateRequireCheckbox,
	validateRequireTextField,
} from '$common';

import { DictionaryState } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { Formik, Form, FormikProps, FieldProps, Field } from 'formik';

interface IProps {
	data: IEnrollPersonForm;
	dictionaries: DictionaryState;
	addPersonPhoto: (photo: File) => void;
	removePersonPhoto: () => void;
	submit: () => void;
}

const ValidationSchema = object({
	docNumber: string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Поле не должно быть пустым'),
	birthPlace: string().notRequired(),
	docType: object({}),
	docGovernment: object().required('Поле не должно быть пустым'),
	docSubType: object().required('Необходимо выбрать вариант'),
	docDate: string().required('Поле не должно быть пустым'),
	docIssieBy: string().required('Поле не должно быть пустым'),
	docFile: object({}).required('Необходимо выбрать поле'),
	docSeries: string().required('Поле не должно быть пустым'),
	birthday: string().required('Поле не должно быть пустым'),
	codeDepartment: string().test('validateState', 'Поле не должно быть пустым', function(value) {
		console.log('test options', value, this.options);

		return false;
	}),
});

//className={this.props.classes.checkFormControl}
const PersonForm = (props: IProps) => {
	const renderApplyCheckbox = () => {
		return (
			<FormControlLabel
				control={<Checkbox color="primary" name="isApplyPersonData" />}
				label="Согласие на обработку персональных данных"
			/>
		);
	};
	const validateForm = () => {
		return {};
	};
	const onSubmit = (props: any) => {
		console.log('onSubmit', props);
	};
	const renderForm = (formProps: FormikProps<any>) => {
		const { values } = formProps;
		const { dictionaries } = props;
		const { docSubType } = values;
		const dictionaryGovernments = dictionaries[EDictionaryNameList.Governments];
		const dictionaryPersonDocTypes = dictionaries[EDictionaryNameList.PersonDocTypes];

		console.log('renderForm', formProps);
		return (
			<Form className="flexColumn" noValidate={true}>
				<DocumentForm
					document={values}
					governmentTitle="Гражданство"
					dictionaryGovernment={dictionaryGovernments && dictionaryGovernments.values}
					docTitle="Файл документа, удостоверяющего личность"
					dictionarySubTypes={dictionaryPersonDocTypes && dictionaryPersonDocTypes.values}
					subTitle="Тип документа удостоверяющего личность"
					extraFields={
						<React.Fragment>
							{docSubType && docSubType.id === 1 && (
								<TextInput
									name="codeDepartment"
									label="Код подразделения"
									type="number"
									placeholder="Введите код подразделения"
								/>
							)}
							<TextInput name="birthday" label="Место рождения" required placeholder="Введите место рождения" />
						</React.Fragment>
					}
				/>
				<div style={{ marginTop: 24 }}>
					<SubmitButton>Далее</SubmitButton>
				</div>
			</Form>
		);
	};

	return (
		<Formik
			onSubmit={onSubmit}
			validationSchema={ValidationSchema}
			validateOnBlur={false}
			validateOnChange={false}
			initialValues={props.data}>
			{renderForm}
		</Formik>
	);
};

export default PersonForm;
