import React, { useState } from 'react';
import { DropdownSelect, Button, DocDataForm, TextInput } from '../../../platform';
import { AppContext } from '../../../App';
import { composeStyles, Styles, EDictionaryNameList, ISelectItem } from '../../../common';

import { IPersonFormData } from '../models';

interface IOwnProps {
	submit: (data: IPersonFormData) => void;
}

interface IState extends IPersonFormData {}
type IProps = IOwnProps;

class PersonDataForm extends React.PureComponent<IProps, IState> {
	public state = {
		docSeries: '',
		docNumber: '',
		docIssieBy: '',
		codeDepartment: '',
		docDate: '',
		docFile: null,
		government: null,
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
	public submit = () => {};
	public render() {
		return (
			<AppContext.Consumer>
				{context => {
					const dictionaryGovernments = context[EDictionaryNameList.Governments];
					const dictionaryPersonDocTypes = context[EDictionaryNameList.PersonDocTypes];
					return (
						<div style={composeStyles(Styles.flexColumn)}>
							<DropdownSelect
								required={true}
								options={dictionaryGovernments && dictionaryGovernments.values}
								placeholder="Выберите гражданство"
								onChangeSelect={this.onChangeSelectField('government')}
								title="Гражданство"
							/>

							<DocDataForm
								isNeedData
								file={this.state.docFile}
								onDownloadFile={this.onDownloadFile}
								onChangeSeries={this.onChangeTextField('docSeries')}
								onChangeNumber={this.onChangeTextField('docNumber')}
								onChangeIssieBy={this.onChangeTextField('docIssieBy')}
								onChangeDate={this.onChangeTextField('docDate')}
								dictionarySubTypes={dictionaryPersonDocTypes && dictionaryPersonDocTypes.values}
								subTitle={'Тип документа удостоверяющего личность'}
								extraFields={
									<TextInput
										label="Код подразделения"
										type="number"
										placeholder={'Введите код подразделения'}
										onBlur={this.onChangeTextField('codeDepartment')}
									/>
								}
							/>
							<div style={{ marginTop: 30, marginBottom: 30 }}>
								<Button variant="contained" color="primary" onClick={this.submit}>
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
