import * as React from 'react';
import { EDictionaryNameList, IDocument, IEnrollEducationForm, ISelectItem, IStylable, pipe, prop } from '$common';

import styles from './styles';
import { DocumentForm, DropdownSelect, FormControlLabel, Checkbox, Form } from '$components';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';

import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { dictionaryStateSelector, enrollEducationFormSelector, IRootState, submitEnrollEducationForm } from '$store';
import { FieldProps, FormikProps } from 'formik';

interface IStateToProps {
	data: IEnrollEducationForm;
	dictionaries: DictionaryState;
}
interface IOwnProps {
	onComplete: () => void;
}
interface IDispatchToProps {
	onSubmit: (values: IEnrollEducationForm) => void;
}
type IProps = IStateToProps & IDispatchToProps & IOwnProps & IStylable;

const EducationForm = (props: IProps) => {
	const toggleStatus = (form: FormikProps<IEnrollEducationForm>) => (
		event: React.ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => {
		form.setFieldValue(event.target.name, checked);
	};
	const renderForm = (formikProps: FieldProps) => {
		const { dictionaries, classes, data } = props;
		const educationTypeDictionary = dictionaries[EDictionaryNameList.EducationDocTypes];
		const firstHighEducation = prop('firstHighEducation', formikProps.form.values);
		const hasEge = prop('hasEge', formikProps.form.values);

		return (
			<>
				<FormControlLabel
					className={classes.checkFormControl}
					control={
						<Checkbox
							checked={firstHighEducation}
							name="firstHighEducation"
							color="primary"
							onChange={toggleStatus(formikProps.form)}
						/>
					}
					label="Получение высшего образования впервые"
				/>

				<DocumentForm
					document={props.data}
					title={'Предыдущее образование'}
					docTitle={'Документ о предыдущем образовании'}
					dictionarySubTypes={educationTypeDictionary && educationTypeDictionary.values}
					subTitle={'Тип документа о предыдущем образовании'}
					extraFields={
						<FormControlLabel
							className={classes.checkFormControl}
							control={<Checkbox color="primary" checked={hasEge} onChange={toggleStatus(formikProps.form)} />}
							label="Имею результаты ЕГЭ"
						/>
					}
				/>
			</>
		);
	};

	return (
		<Form
			schema
			buttonText="Далее"
			renderForm={renderForm}
			onSubmit={pipe(
				props.onSubmit,
				props.onComplete,
			)}
			initialValues={{ ...props.data }}
		/>
	);
};

const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);

	const data = enrollEducationFormSelector(state);

	return { data, dictionaries };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = {
	onSubmit: submitEnrollEducationForm,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withStyles(styles)(EducationForm));
