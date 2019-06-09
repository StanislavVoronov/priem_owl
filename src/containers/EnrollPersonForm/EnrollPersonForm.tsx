import React from 'react';
import { Checkbox, WebPhoto, Form, DocumentForm, TextInput, FormControlLabel } from '$components';

import {
	EDictionaryNameList,
	IEnrollPersonForm,
	IStylable,
	pipe,
	DocumentFormSchema,
	EnrollContactsFormSchema,
	EnrollPersonFormSchema,
} from '$common';

import { DictionaryState } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { Formik, FormikProps, FieldProps, Field } from 'formik';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	addPersonPhoto,
	dictionaryStateSelector,
	enrollPersonFormSelector,
	IRootState,
	removePersonPhoto,
	submitEnrollPersonForm,
} from '$store';

interface IStateToProps {
	data: IEnrollPersonForm;
	dictionaries: DictionaryState;
}
interface IDispatchToProps {
	addPersonPhoto: (file: File) => void;
	removePersonPhoto: () => void;
	submit: (values: IEnrollPersonForm) => void;
}

interface IOwnProps {
	onComplete: () => void;
}

type IProps = IStateToProps & IDispatchToProps & IOwnProps & IStylable;
const PersonForm = (props: IProps) => {
	const renderApplyCheckbox = () => {
		return (
			<FormControlLabel
				control={<Checkbox color="primary" name="isApplyPersonData" />}
				label="Согласие на обработку персональных данных"
			/>
		);
	};
	const renderForm = (formProps: FieldProps) => {
		const { values } = formProps.form;
		const { dictionaries } = props;
		const { docSubType } = values;
		const dictionaryGovernments = dictionaries[EDictionaryNameList.Governments];
		const dictionaryPersonDocTypes = dictionaries[EDictionaryNameList.PersonDocTypes];

		return (
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
						<FormControlLabel
							className={props.classes.checkFormControl}
							control={<Checkbox color="primary" name="isApplyPersonData" />}
							label="Согласие на обработку персональных данных"
						/>
					</React.Fragment>
				}
			/>
		);
	};

	return (
		<Form
			onSubmit={pipe(
				props.submit,
				props.onComplete,
			)}
			buttonText="Далее"
			renderForm={renderForm}
			schema={{ ...DocumentFormSchema, ...EnrollPersonFormSchema }}
			initialValues={props.data}
		/>
	);
};

const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);

	const data = enrollPersonFormSelector(state);

	return { dictionaries, data };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = {
	addPersonPhoto,
	removePersonPhoto,
	submit: submitEnrollPersonForm,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withStyles(styles)(PersonForm));
