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
} from '$common';

import styles from './styles.module.css';
import { IDictionaryState } from '@mgutm-fcu/dictionary';

interface IProps {
	dictionaries: IDictionaryState;
	defaultData: IPersonForm;
	updateForm: <T>(field: keyof IPersonForm, value: T) => void;
}

class PersonForm extends React.PureComponent<IProps> {
	toggleAgreePersonData = (_: any, checked: boolean) => {
		this.props.updateForm('isApplyPersonData', checked);
	};
	addPhoto = (docFile: File) => {
		this.props.updateForm('photo', { ...this.props.defaultData.photo, docFile });
	};
	removePhoto = () => {
		this.props.updateForm('photo', { ...this.props.defaultData.photo, docFile: null });
	};
	onChangeCodeDepartment: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateForm('document', {
			...this.props.defaultData.document,
			codeDepartment: inputValueAsString(event),
		});
	};
	updateDocument = (document: IDocument) => {
		this.props.updateForm('document', document);
	};
	onChangeBirthPlace: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateForm('birthPlace', inputValueAsString(event));
	};
	onChangeGovernment = (item: ISelectItem) => {
		this.props.updateForm('document', { ...this.props.defaultData.document, docGovernment: item });
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
					classes={{ root: styles.checkFormControl, label: styles.checkFormControlLabel }}
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

export default PersonForm;
