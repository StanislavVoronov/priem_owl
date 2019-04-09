import React from 'react';
import { IDocData, IDocDataItem } from '../models';
import Button from '@material-ui/core/Button';
import { DocDataForm, ISelectItem, TextInput } from '../../../platform';
import { AppContext } from '../App';
import { EDictionaryNameList, inValidateDataForm, IDocSelectItem } from '../../../common';
import '../styles/common.css';
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
					const isDisabledAddButton = this.state.documents.map(inValidateDataForm).includes(true);
					console.log('disable', isDisabledAddButton);
					return (
						<div className="flexColumn">
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
										<div className="flexColumn formDocBorder">
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
												<Button
													variant="contained"
													classes={{ root: 'deleteDocButton' }}
													onClick={this.deleteDoc(index)}>
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
									classes={{ contained: isDisabledAddButton ? 'addButtonSpace' : 'addDocButton' }}
									onClick={this.addDoc}>
									{'Добавить новый документ'}
								</Button>
							</div>
							<div className="nextButtonContainer">
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
