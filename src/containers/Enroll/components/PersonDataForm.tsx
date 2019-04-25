import React from 'react';
import { DropdownSelect, Button, DocDataForm, TextInput, ISelectItem } from '../../../platform';

import { EDictionaryNameList, IDocType, inValidateDataForm } from '../../../common';

import { IDocDataItem, IPersonDataForm } from '../models';
import { defaultPersonDataForm } from '../defaults';
import Styles from '../styles/common.css';
import { DictionaryContext } from '../EnrollContainer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import WebPhoto from '../../../platform/WebPhoto';
import styles from './styles.css';
interface IOwnProps {
	submit: (data: IPersonDataForm) => void;
}

type IProps = IOwnProps;
interface IState extends IPersonDataForm {
	isApplyPersonData: boolean;
	photo: IDocDataItem;
}

class PersonDataForm extends React.PureComponent<IProps, IState> {
	public state = {
		...defaultPersonDataForm,
		isApplyPersonData: false,
	};
	public onChangeTextField = (name: string) => (value: string) => {
		this.setState(state => ({
			...state,
			[name]: value,
		}));
	};
	public onChangeSelectField = (name: string) => (value: ISelectItem) => {
		this.setState(state => ({
			...state,
			[name]: value,
		}));
	};
	public onDownloadFile = (doc: File) => {
		this.setState({
			docFile: doc,
		});
	};
	selectSubType = (docSubType: IDocType) => {
		let docGovernment = null;
		if (docSubType.id === 1) {
			docGovernment = { id: 1, name: 'Россия' };
		}
		this.setState({ docSubType, docGovernment });
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
	onChangeGovernment = (docGovernment: ISelectItem) => {
		this.setState({ docGovernment });
	};
	submit = () => {
		this.props.submit(this.state);
	};
	public render() {
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
								placeholder={'Введите место рождения'}
								onBlur={this.onChangeTextField('birthPlace')}
							/>
							<DocDataForm
								docTitle="Файл документа, удостоверяющего личность"
								file={this.state.docFile}
								selectDocSubType={this.selectSubType}
								defaultSubType={this.state.docSubType}
								onDownloadFile={this.onDownloadFile}
								onChangeSeries={this.onChangeTextField('docSeries')}
								onChangeNumber={this.onChangeTextField('docNumber')}
								onChangeIssieBy={this.onChangeTextField('docIssieBy')}
								onChangeDate={this.onChangeTextField('docDate')}
								dictionarySubTypes={dictionaryPersonDocTypes && dictionaryPersonDocTypes.values}
								subTitle={'Тип документа удостоверяющего личность'}
								extraFields={
									this.state.docSubType && this.state.docSubType.id === 1 ? (
										<TextInput
											label="Код подразделения"
											type="number"
											placeholder={'Введите код подразделения'}
											onChange={this.onChangeTextField('codeDepartment')}
										/>
									) : null
								}
							/>

							<DropdownSelect
								value={`${this.state.docGovernment ? this.state.docGovernment.id : ''}`}
								defaultValue={this.state.docGovernment}
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
