import * as React from 'react';
import { EDictionaryNameList, IDocument, IEnrollEducationForm, ISelectItem, IStylable } from '$common';

import styles from './styles';
import { DocumentForm, DropdownSelect, FormControlLabel, Checkbox } from '$components';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';
import Button from '../../components/Buttons/Button';
import { Formik } from 'formik';

interface IProps extends IStylable {
	data: IEnrollEducationForm;
	dictionaries: DictionaryState;
	updateEducationDocument: (document: IDocument) => void;
	toggleHasEgeStatus: () => void;
	toggleFirstHighEducationStatus: () => void;
	submit: () => void;
}

class EducationFormView extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};

	renderForm = () => {
		const { dictionaries, classes, data } = this.props;
		const educationTypeDictionary = dictionaries[EDictionaryNameList.EducationDocTypes];
		const { firstHighEducation, educationDocument, hasEge } = data;

		return (
			<div className="flexColumn">
				<FormControlLabel
					className={classes.checkFormControl}
					control={
						<Checkbox
							checked={firstHighEducation}
							color="primary"
							onChange={this.props.toggleFirstHighEducationStatus}
						/>
					}
					label="Получение высшего образования впервые"
				/>

				<DocumentForm
					document={educationDocument}
					title={'Предыдущее образование'}
					docTitle={'Документ о предыдущем образовании'}
					updateDocument={this.props.updateEducationDocument}
					dictionarySubTypes={educationTypeDictionary && educationTypeDictionary.values}
					subTitle={'Тип документа о предыдущем образовании'}
					extraFields={
						<FormControlLabel
							className={classes.checkFormControl}
							control={<Checkbox color="primary" checked={hasEge} onChange={this.props.toggleHasEgeStatus} />}
							label="Имею результаты ЕГЭ"
						/>
					}
				/>
				<div style={{ marginTop: 24 }}>
					<Button onClick={this.props.submit}>Далее</Button>
				</div>
			</div>
		);
	};
	render() {
		return (
			<Formik
				onSubmit={this.props.submit}
				validateOnBlur={false}
				validateOnChange={false}
				initialValues={{ ...this.props.data, ...this.props.data.educationDocument }}>
				{this.renderForm}
			</Formik>
		);
	}
}

export default withStyles(styles)(EducationFormView);
