import React from 'react';
import { DropdownSelect, Checkbox, Button, WebPhoto, DocDataForm, TextInput, FormControlLabel } from '$components';

import { EDictionaryNameList, IDocType, IDocument, inputValueAsString, inValidateDataForm, ISelectItem } from '$common';

import { IDocumentWithDepartment, IPersonDataForm } from '../models';
import Styles from '../styles/common.module.css';
import { DictionaryContext } from '../EnrollContainer';
import styles from './styles.module.css';
interface IOwnProps {
	defaultData: IPersonDataForm;
	submit: (data: IPersonDataForm) => void;
}

type IProps = IOwnProps;
interface IState extends IPersonDataForm {
	isApplyPersonData: boolean;
	photo: IDocumentWithDepartment;
}

class PersonDataForm extends React.PureComponent<IProps, IState> {
	state = {
		...this.props.defaultData,
		isApplyPersonData: false,
	};
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
		return (
			<DictionaryContext.Consumer>
				{dictionaries => {
					const dictionaryGovernments = dictionaries[EDictionaryNameList.Governments];
					const dictionaryPersonDocTypes = dictionaries[EDictionaryNameList.PersonDocTypes];

					return (
						<div className={Styles.flexColumn}>
							<WebPhoto downloadPhoto={this.addPhoto} removePhoto={this.removePhoto} />
							<TextInput
								label="Место рождения"
								defaultValue={this.props.defaultData.birthPlace}
								placeholder={'Введите место рождения'}
								onBlur={this.onChangeBirthPlace}
							/>
							<DocDataForm
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
									<Checkbox
										color="primary"
										checked={this.state.isApplyPersonData}
										onChange={this.toggleAgreePersonData}
									/>
								}
								label="Согласие на обработку персональных данных"
							/>
							<div className={Styles.nextButtonContainer}>
								<Button
									variant="contained"
									color="primary"
									disabled={
										inValidateDataForm(this.state) || !this.state.isApplyPersonData || !this.state.photo.docFile
									}
									onClick={this.submit}>
									{'Далее'}
								</Button>
							</div>
						</div>
					);
				}}
			</DictionaryContext.Consumer>
		);
	}
}

export default PersonDataForm;
