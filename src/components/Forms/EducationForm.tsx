import * as React from 'react';
import {
	EDictionaryNameList,
	IDocument,
	IEducationForm,
	validateDataForm,
	ISelectItem,
	validateDocument,
	IContactsForm,
	IStylable,
} from '$common';

import styles from './styles';
import { DocumentForm, DropdownSelect, FormControlLabel, Checkbox, LoadingButton } from '$components';
import { IDictionaryState } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';

interface IProps extends IStylable {
	dictionaries: IDictionaryState;
	defaultData: IEducationForm;
	updateForm: (data: IEducationForm) => void;
}

class EducationForm extends React.PureComponent<IProps, IEducationForm> {
	static defaultProps = {
		classes: {},
	};
	state = this.props.defaultData;

	updateForm = () => {
		this.props.updateForm(this.state);
	};
	toggleFirstHighEducationStatus = (_: any, checked: boolean) => {
		this.setState({ firstHighEducation: checked }, this.updateForm);
	};
	toggleHasEgeStatus = (_: any, checked: boolean) => {
		this.setState({ hasEge: checked }, this.updateForm);
	};

	onChangePersonCoolnessTypes = (items: ISelectItem[]) => {
		this.setState({ coolnessTypes: items }, this.updateForm);
	};
	updateDocument = (document: IDocument) => {
		this.setState({ document }, this.updateForm);
	};

	render() {
		const { dictionaries, classes } = this.props;
		const coolnessTypeDictionary = dictionaries[EDictionaryNameList.CoolnessTypes];
		const educationTypeDictionary = dictionaries[EDictionaryNameList.EducationDocTypes];

		return (
			<div className="flexColumn">
				<FormControlLabel
					className={classes.checkFormControl}
					control={
						<Checkbox
							value={this.state.firstHighEducation}
							color="primary"
							onChange={this.toggleFirstHighEducationStatus}
						/>
					}
					label="Получение высшего образования впервые"
				/>
				<DropdownSelect
					defaultValue={this.state.coolnessTypes}
					placeholder={'Выберите достижения'}
					onChange={this.onChangePersonCoolnessTypes}
					options={coolnessTypeDictionary && coolnessTypeDictionary.values}
					isMulti={true}
					title={'Индивидуальные достижения'}
				/>
				<DocumentForm
					document={this.state.document}
					title={'Предыдущее образование'}
					docTitle={'Документ о предыдущем образовании'}
					updateDocument={this.updateDocument}
					dictionarySubTypes={educationTypeDictionary && educationTypeDictionary.values}
					subTitle={'Тип документа о предыдущем образовании'}
					extraFields={
						<FormControlLabel
							className={classes.checkFormControl}
							control={<Checkbox color="primary" onChange={this.toggleHasEgeStatus} />}
							label="Имею результаты ЕГЭ"
						/>
					}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(EducationForm);
