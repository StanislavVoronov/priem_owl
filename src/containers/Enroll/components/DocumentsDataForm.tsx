import React from 'react';
import { IDocData } from '../models';
import Button from '@material-ui/core/Button';
import DocDataForm from '../../../platform/DocDataForm';
import { AppContext } from '../App';
import {
	composeStyles,
	EDictionaryNameList,
	GlobalStyles,
	ISelectItem,
	inValidateDataForm,
	IDocSelectItem,
} from '../../../common';
import TextInput from '../../../platform/TextInput';

export interface IDocDataItem extends IDocData {
	codeDepartment?: string;
}

interface IOwnProps {
	submit(data: IDocDataItem[]): void;
}
interface IDocDataForm extends IDocData {
	hideDataFields: boolean;
}
interface IState {
	documents: IDocDataForm[];
}
const defaultDocFile = {
	docFile: null,
	hideDataFields: true,
	docType: null,
};
type IProps = IOwnProps;
const styles = {
	addDocButton: { backgroundColor: '#4caf50', color: 'white', marginTop: 40, marginBottom: 40 },
	spaceAddButton: { marginTop: 40, marginBottom: 40 },
	deleteDocButton: { backgroundColor: 'red', color: 'white', marginTop: 15, marginBottom: 10 },
	border: { borderBottom: '2px solid #3f51b5' },
};
class DocumentsDataForm extends React.PureComponent<IProps, IState> {
	state = {
		documents: [],
	};
	addDoc = () => {
		this.setState({ documents: [...this.state.documents, { ...defaultDocFile }] });
	};
	onDownloadFile = (index: number) => (file: File | null) => {
		const documents: IDocDataForm[] = [...this.state.documents];
		documents[index].docFile = file;

		this.setState({ documents });
	};
	onChangeTextField = (index: number, name: string) => (value: string) => {
		const documents: IDocDataForm[] = [...this.state.documents];
		documents[index][name] = value;
		this.setState({ documents });
	};
	selectDocType = (index: number) => (type: IDocSelectItem) => {
		const documents: IDocDataForm[] = [...this.state.documents];

		documents[index].hideDataFields = type.need_info !== 1;

		if (type.id > 2) {
			documents[index] = {
				...documents[index],
				docType: type,
				docSubType: null,
				docIssieBy: '',
				docDate: '',
				docSeries: '',
				docNumber: '',
			};
		} else {
			documents[index].docType = type;
		}

		this.setState({ documents });
	};
	selectDocSubType = (index: number) => (type: ISelectItem) => {
		const documents: IDocDataForm[] = [...this.state.documents];
		documents[index].docSubType = type;
		this.setState({ documents });
	};
	deleteDoc = (index: number) => () => {
		const documents: IDocDataForm[] = this.state.documents.filter((item, key) => key !== index);

		this.setState({ documents });
	};
	submit = () => {
		this.props.submit(this.state.documents);
	};
	render() {
		return (
			<AppContext.Consumer>
				{context => {
					const dictionaryDocTypes = context[EDictionaryNameList.DocTypes];
					const isDisabledAddButton = this.state.documents.map(inValidateDataForm).includes(false);
					console.log('disable', isDisabledAddButton);
					return (
						<div style={GlobalStyles.flexColumn}>
							<div>
								{this.state.documents.map((item: IDocDataForm, index) => {
									console.log('item', item);
									const docType = item.docType && item.docType.id;

									const dictionarySubDocTypes =
										docType === 1
											? context[EDictionaryNameList.PersonDocTypes].values
											: docType === 2
											? context[EDictionaryNameList.EducationDocTypes].values
											: undefined;

									return (
										<div style={composeStyles(GlobalStyles.flexColumn, styles.border)}>
											<DocDataForm
												hideDataFields={item.hideDataFields}
												docTitle="Файл документа"
												file={item.docFile}
												title="Тип документа"
												selectDocSubType={this.selectDocSubType(index)}
												selectDocType={this.selectDocType(index)}
												dictionaryTypes={dictionaryDocTypes && dictionaryDocTypes.values}
												onDownloadFile={this.onDownloadFile(index)}
												onChangeSeries={this.onChangeTextField(index, 'docSeries')}
												onChangeNumber={this.onChangeTextField(index, 'docNumber')}
												onChangeIssieBy={this.onChangeTextField(index, 'docIssieBy')}
												onChangeDate={this.onChangeTextField(index, 'docDate')}
												subTitle={'Название документа'}
												dictionarySubTypes={docType && dictionarySubDocTypes}
												extraFields={
													item.docType && item.docType.id === 1 && item.docSubType && item.docSubType.id === 1 ? (
														<TextInput
															label="Код подразделения"
															type="number"
															placeholder={'Введите код подразделения'}
															onChange={this.onChangeTextField(index, 'codeDepartment')}
														/>
													) : null
												}
											/>
											<div>
												<Button variant="contained" style={styles.deleteDocButton} onClick={this.deleteDoc(index)}>
													{'Удалить документ'}
												</Button>
											</div>
										</div>
									);
								})}
							</div>
							<div>
								<Button
									disabled={isDisabledAddButton}
									variant="contained"
									style={!isDisabledAddButton ? styles.addDocButton : styles.spaceAddButton}
									onClick={this.addDoc}>
									{'Добавить новый документ'}
								</Button>
							</div>
							<div style={GlobalStyles.buttonNext}>
								<Button variant="contained" color="primary" disabled={isDisabledAddButton} onClick={this.submit}>
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

export default DocumentsDataForm;
