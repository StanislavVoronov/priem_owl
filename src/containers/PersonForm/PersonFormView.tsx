import React, { ChangeEvent } from 'react';
import {
	DropdownSelect,
	Checkbox,
	WebPhoto,
	DocumentForm,
	TextInput,
	FormControlLabel,
	SubmitButton,
} from '$components';
import { EDictionaryNameList, IDocument, IEnrollPersonForm, ISelectItem, IStylable } from '$common';

import { DictionaryState } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { Formik } from 'formik';

interface IProps extends IStylable {
	data: IEnrollPersonForm;
	dictionaries: DictionaryState;
	updatePersonDocument: (data: IDocument) => void;
	onChangeBirthPlace: (event: any) => void;
	addPersonPhoto: (photo: File) => void;
	removePersonPhoto: () => void;
	onChangeGovernment: (value: ISelectItem) => void;
	onChangeCodeDepartment: (event: any) => void;
	onChangeApplyPersonDataStatus: () => void;
	submit: () => void;
}

class PersonForm extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};
	renderForm = () => {
		const { dictionaries, classes, data } = this.props;
		const { personDocument, isApplyPersonData } = data;
		const dictionaryGovernments = dictionaries[EDictionaryNameList.Governments];
		const dictionaryPersonDocTypes = dictionaries[EDictionaryNameList.PersonDocTypes];

		return (
			<div className="flexColumn">
				<WebPhoto addPhoto={this.props.addPersonPhoto} removePhoto={this.props.removePersonPhoto} />
				<DocumentForm
					document={personDocument}
					governmentTitle="Гражданство"
					dictionaryGovernment={dictionaryGovernments && dictionaryGovernments.values}
					docTitle="Файл документа, удостоверяющего личность"
					updateDocument={this.props.updatePersonDocument}
					dictionarySubTypes={dictionaryPersonDocTypes && dictionaryPersonDocTypes.values}
					subTitle="Тип документа удостоверяющего личность"
					extraFields={
						<React.Fragment>
							{personDocument.docSubType && personDocument.docSubType.id === 1 && (
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
				<FormControlLabel
					className={classes.checkFormControl}
					control={
						<Checkbox color="primary" checked={isApplyPersonData} onChange={this.props.onChangeApplyPersonDataStatus} />
					}
					label="Согласие на обработку персональных данных"
				/>
				<div style={{ marginTop: 24 }}>
					<SubmitButton>Проверить</SubmitButton>
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
				initialValues={{ ...this.props.data, ...this.props.data.personDocument }}>
				{this.renderForm}
			</Formik>
		);
	}
}

export default withStyles(styles)(PersonForm);
