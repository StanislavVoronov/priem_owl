import React from 'react';
import {
	DropdownSelect,
	Checkbox,
	LoadingButton,
	WebPhoto,
	DocumentForm,
	TextInput,
	FormControlLabel,
} from '$components';
import {
	EDictionaryNameList,
	IDocument,
	inputValueAsString,
	validateDataForm,
	IPersonForm,
	ISelectItem,
	validateDocument,
	IRegisterForm,
	IStylable,
} from '$common';

import styles from './styles';
import { IDictionaryState } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';

interface IProps extends IStylable {
	dictionaries: IDictionaryState;
	defaultData: IPersonForm;
	updateForm: (data: IPersonForm) => void;
}

class PersonForm extends React.PureComponent<IProps, IPersonForm> {
	static defaultProps = {
		classes: {},
	};
	state = this.props.defaultData;

	updateForm = () => {
		this.props.updateForm(this.state);
	};
	toggleAgreePersonData = (_: any, checked: boolean) => {
		this.setState({ isApplyPersonData: checked }, this.updateForm);
	};
	addPhoto = (docFile: File) => {
		this.setState({ photo: { ...this.state.photo, docFile } }, this.updateForm);
	};
	removePhoto = () => {
		this.setState({ photo: { ...this.state.photo, docFile: null } }, this.updateForm);
	};
	onChangeCodeDepartment: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ document: { ...this.state.document, codeDepartment: inputValueAsString(event) } }, this.updateForm);
	};
	updateDocument = (document: IDocument) => {
		this.setState({ document }, this.updateForm);
	};
	onChangeBirthPlace: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ birthPlace: inputValueAsString(event) }, this.updateForm);
	};
	onChangeGovernment = (item: ISelectItem) => {
		this.setState({ document: { ...this.state.document, docGovernment: item } }, this.updateForm);
	};
	render() {
		const { dictionaries } = this.props;
		const dictionaryGovernments = dictionaries[EDictionaryNameList.Governments];
		const dictionaryPersonDocTypes = dictionaries[EDictionaryNameList.PersonDocTypes];

		return (
			<div className="flexColumn">
				<WebPhoto downloadPhoto={this.addPhoto} removePhoto={this.removePhoto} />
				<TextInput
					label="Место рождения"
					defaultValue={this.props.defaultData.birthPlace}
					placeholder={'Введите место рождения'}
					onBlur={this.onChangeBirthPlace}
				/>
				<DocumentForm
					document={this.props.defaultData.document}
					docTitle="Файл документа, удостоверяющего личность"
					updateDocument={this.updateDocument}
					dictionarySubTypes={dictionaryPersonDocTypes && dictionaryPersonDocTypes.values}
					subTitle={'Тип документа удостоверяющего личность'}
					extraFields={
						this.props.defaultData.document.docSubType && this.props.defaultData.document.docSubType.id === 1 ? (
							<TextInput
								label="Код подразделения"
								type="number"
								defaultValue={this.props.defaultData.codeDepartment}
								placeholder={'Введите код подразделения'}
								onChange={this.onChangeCodeDepartment}
							/>
						) : null
					}
				/>

				<DropdownSelect
					value={this.props.defaultData.document.docGovernment}
					required={true}
					options={dictionaryGovernments && dictionaryGovernments.values}
					placeholder="Выберите гражданство"
					onChange={this.onChangeGovernment}
					title="Гражданство"
				/>

				<FormControlLabel
					className={this.props.classes.checkFormControl}
					control={
						<Checkbox
							color="primary"
							checked={this.props.defaultData.isApplyPersonData}
							onChange={this.toggleAgreePersonData}
						/>
					}
					label="Согласие на обработку персональных данных"
				/>
			</div>
		);
	}
}

export default withStyles(styles)(PersonForm);
