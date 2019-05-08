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
	data: IPersonForm;
	updateForm: (data: Partial<IPersonForm>) => void;
}

class PersonForm extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};
	toggleAgreePersonData = (_: any, checked: boolean) => {
		this.props.updateForm({ isApplyPersonData: checked });
	};
	addPhoto = (docFile: File) => {
		this.props.updateForm({ photo: { ...this.props.data.photo, docFile } });
	};
	deletePhoto = () => {
		this.props.updateForm({ photo: { ...this.props.data.photo, docFile: null } });
	};
	onChangeCodeDepartment: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateForm({ document: { ...this.props.data.document, codeDepartment: inputValueAsString(event) } });
	};
	updateDocument = (document: IDocument) => {
		this.props.updateForm({ document });
	};
	onChangeBirthPlace: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateForm({ birthPlace: inputValueAsString(event) });
	};
	onChangeGovernment = (item: ISelectItem) => {
		this.props.updateForm({ document: { ...this.props.data.document, docGovernment: item } });
	};
	render() {
		const { dictionaries, classes, data } = this.props;
		const dictionaryGovernments = dictionaries[EDictionaryNameList.Governments];
		const dictionaryPersonDocTypes = dictionaries[EDictionaryNameList.PersonDocTypes];

		return (
			<div className="flexColumn">
				<WebPhoto downloadPhoto={this.addPhoto} removePhoto={this.deletePhoto} />
				<TextInput
					label="Место рождения"
					defaultValue={this.props.data.birthPlace}
					placeholder={'Введите место рождения'}
					onBlur={this.onChangeBirthPlace}
				/>
				<DocumentForm
					document={data.document}
					docTitle="Файл документа, удостоверяющего личность"
					updateDocument={this.updateDocument}
					dictionarySubTypes={dictionaryPersonDocTypes && dictionaryPersonDocTypes.values}
					subTitle={'Тип документа удостоверяющего личность'}
					extraFields={
						data.document.docSubType && data.document.docSubType.id === 1 ? (
							<TextInput
								label="Код подразделения"
								type="number"
								defaultValue={data.codeDepartment}
								placeholder={'Введите код подразделения'}
								onChange={this.onChangeCodeDepartment}
							/>
						) : null
					}
				/>

				<DropdownSelect
					defaultValue={data.document.docGovernment}
					required={true}
					options={dictionaryGovernments && dictionaryGovernments.values}
					placeholder="Выберите гражданство"
					onChange={this.onChangeGovernment}
					title="Гражданство"
				/>

				<FormControlLabel
					className={classes.checkFormControl}
					control={<Checkbox color="primary" checked={data.isApplyPersonData} onChange={this.toggleAgreePersonData} />}
					label="Согласие на обработку персональных данных"
				/>
			</div>
		);
	}
}

export default withStyles(styles)(PersonForm);
