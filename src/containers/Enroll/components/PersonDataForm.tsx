import React, { useState } from 'react';
import { DropdownSelect, Button, DocDataForm, TextInput } from '../../../platform';
import { AppContext } from '../App';
import { composeStyles, EDictionaryNameList, ISelectItem, inValidateDataForm, GlobalStyles } from '../../../common';

import { IPersonDataForm } from '../models';

interface IOwnProps {
	submit: (data: IPersonDataForm) => void;
}

interface IState extends IPersonDataForm {}
type IProps = IOwnProps;

class PersonDataForm extends React.PureComponent<IProps, IState> {
	public state: IState = {
		docType: { id: 1, name: '' },
		docSeries: '',
		docNumber: '',
		docIssieBy: '',
		codeDepartment: '',
		docDate: '',
		docFile: null,
		government: null,
		docSubType: null,
		birthPlace: '',
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
		this.setState(state => ({
			...state,
			docFile: doc,
		}));
	};
	selectSubType = (subType: ISelectItem) => {
		this.setState({ docSubType: subType });
	};
	submit = () => {
		this.props.submit(this.state);
	};
	public render() {
		console.log('personData', this.state);
		return (
			<AppContext.Consumer>
				{context => {
					const dictionaryGovernments = context[EDictionaryNameList.Governments];
					const dictionaryPersonDocTypes = context[EDictionaryNameList.PersonDocTypes];
					return (
						<div style={composeStyles(GlobalStyles.flexColumn)}>
							<DropdownSelect
								required={true}
								options={dictionaryGovernments && dictionaryGovernments.values}
								placeholder="Выберите гражданство"
								onChangeSelect={this.onChangeSelectField('government')}
								title="Гражданство"
							/>
							<TextInput
								label="Место рождения"
								placeholder={'Введите место рождения'}
								onBlur={this.onChangeTextField('birthPlace')}
							/>
							<DocDataForm
								docTitle="Файл документа, удостоверяющего личность"
								file={this.state.docFile}
								selectDocSubType={this.selectSubType}
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
							<div style={GlobalStyles.buttonNext}>
								<Button
									variant="contained"
									color="primary"
									disabled={inValidateDataForm(this.state)}
									onClick={this.submit}>
									{'Далее'}
								</Button>
							</div>
						</div>
					);
				}}
			</AppContext.Consumer>
		);
	}
}

export default PersonDataForm;
