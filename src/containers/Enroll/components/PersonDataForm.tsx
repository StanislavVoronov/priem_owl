import React from 'react';
import { DropdownSelect, Button, DocDataForm, TextInput, ISelectItem } from '../../../platform';
import { AppContext } from '../EnrollView';
import { EDictionaryNameList, inValidateDataForm } from '../../../common';

import { IPersonDataForm } from '../models';
import { defaultPersonDataForm } from '../defaults';
import Styles from '../styles/common.css';
import { IDictionary } from '@mgutm-fcu/dictionary';
interface IOwnProps {
	dictionaries: Record<string, IDictionary>;
	submit: (data: IPersonDataForm) => void;
}

type IProps = IOwnProps;

class PersonDataForm extends React.PureComponent<IProps, IPersonDataForm> {
	public state = defaultPersonDataForm;
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
	selectSubType = (subType: ISelectItem) => {
		this.setState({ docSubType: subType });
	};
	submit = () => {
		this.props.submit(this.state);
	};
	public render() {
		console.log(this.state.docFile ? new Blob([this.state.docFile], { type: this.state.docFile.type }) : null);
		return (
			<AppContext.Consumer>
				{context => {
					const dictionaryGovernments = context[EDictionaryNameList.Governments];
					const dictionaryPersonDocTypes = context[EDictionaryNameList.PersonDocTypes];
					return (
						<div className={Styles.flexColumn}>
							<DropdownSelect
								required={true}
								options={dictionaryGovernments && dictionaryGovernments.values}
								placeholder="Выберите гражданство"
								onChangeSelect={this.onChangeSelectField('docGovernment')}
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
							<div className={Styles.nextButtonContainer}>
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
