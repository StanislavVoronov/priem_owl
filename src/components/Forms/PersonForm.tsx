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
} from '$common';

import styles from './styles.module.css';
import { IDictionaryState } from '@mgutm-fcu/dictionary';

interface IProps {
	dictionaries: IDictionaryState;
	defaultData: IPersonForm;
	submit: (data: IPersonForm) => void;
}

class PersonForm extends React.PureComponent<IProps, IPersonForm> {
	state = this.props.defaultData;

	toggleAgreePersonData = () => {
		this.setState({ isApplyPersonData: !this.state.isApplyPersonData });
	};
	addPhoto = (docFile: File) => {
		this.setState({ photo: { ...this.state.photo, docFile } });
	};
	removePhoto = () => {
		this.setState({ photo: { ...this.state.photo, docFile: null } });
	};
	submit = () => {
		this.props.submit(this.state);
	};
	onChangeCodeDepartment: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ document: { ...this.state.document, codeDepartment: inputValueAsString(event) } });
	};
	updateDocument = (document: IDocument) => {
		this.setState({ document });
	};
	onChangeBirthPlace: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ birthPlace: inputValueAsString(event) });
	};
	onChangeGovernment = (item: ISelectItem) => {
		this.setState({ document: { ...this.state.document, docGovernment: item } });
	};
	render() {
		const { dictionaries } = this.props;
		const dictionaryGovernments = dictionaries[EDictionaryNameList.Governments];
		const dictionaryPersonDocTypes = dictionaries[EDictionaryNameList.PersonDocTypes];
		const invalidForm = !(validateDataForm(this.state) && validateDocument(this.state.document));

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
					document={this.state.document}
					docTitle="Файл документа, удостоверяющего личность"
					updateDocument={this.updateDocument}
					dictionarySubTypes={dictionaryPersonDocTypes && dictionaryPersonDocTypes.values}
					subTitle={'Тип документа удостоверяющего личность'}
					extraFields={
						this.state.document.docSubType && this.state.document.docSubType.id === 1 ? (
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
					value={this.state.document.docGovernment}
					required={true}
					options={dictionaryGovernments && dictionaryGovernments.values}
					placeholder="Выберите гражданство"
					onChange={this.onChangeGovernment}
					title="Гражданство"
				/>

				<FormControlLabel
					classes={{ root: styles.checkFormControl, label: styles.checkFormControlLabel }}
					control={
						<Checkbox color="primary" checked={this.state.isApplyPersonData} onChange={this.toggleAgreePersonData} />
					}
					label="Согласие на обработку персональных данных"
				/>
				<LoadingButton onClick={this.submit} disabled={invalidForm}>
					Подтвердить
				</LoadingButton>
			</div>
		);
	}
}

export default PersonForm;
