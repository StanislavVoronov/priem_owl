import React from 'react';
import { IDocumentWithDepartment } from '../models';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { DocDataForm, TextInput } from '$components';
import { EDictionaryNameList, inValidateDataForm, IDocType, inputValueAsString, IDocument } from '$common';

import styles from './styles.module.css';
import { DictionaryContext } from '../EnrollContainer';
import { defaultDocument } from '../defaults';

interface IOwnProps {
	defaultData: IDocument[];
	classes: Record<string, string>;
	submit(data: IDocumentWithDepartment[]): void;
}

interface IState {
	documents: IDocument[];
}

type IProps = IOwnProps;

class DocumentsDataForm extends React.PureComponent<IProps, IState> {
	static defaultProps = {
		classes: {},
	};
	state = {
		documents: this.props.defaultData,
	};
	deleteDoc = (index: number) => () => {
		const documents = this.state.documents.filter((_: IDocument, key: number) => key !== index);
		this.setState({ documents });
	};
	addDoc = () => {
		this.setState({ documents: [...this.state.documents, { ...defaultDocument }] });
	};
	submit = () => {
		this.props.submit(this.state.documents);
	};
	updateDocument = (index: number) => (document: IDocument) => {
		const documents = this.state.documents.filter((_: IDocument, key: number) => key !== index);
		this.setState({ documents: [...documents, document] });
	};
	onChangeCodeDepartment = (index: number): React.ChangeEventHandler<HTMLInputElement> => event => {
		const document = this.state.documents[index];
		const documents = this.state.documents.filter((_: IDocument, key: number) => key !== index);
		this.setState({ documents: [...documents, { ...document, codeDepartment: inputValueAsString(event) }] });
	};
	render() {
		return (
			<DictionaryContext.Consumer>
				{dictionaries => {
					const dictionaryDocTypes = dictionaries[EDictionaryNameList.DocTypes];
					const isDisabledAddButton = this.state.documents.map(inValidateDataForm).includes(true);

					return (
						<div className={styles.flexColumn}>
							<div>
								{this.state.documents.map((item: IDocument, index) => {
									const docType = item.docType && item.docType.id;

									const dictionarySubDocTypes =
										docType === 1
											? dictionaries[EDictionaryNameList.PersonDocTypes].values
											: docType === 2
											? dictionaries[EDictionaryNameList.EducationDocTypes].values
											: undefined;

									return (
										<div
											key={`${index}-${item.docNumber}-${item.docSeries}`}
											className={classNames(styles.flexColumn, styles.docFormContainer)}>
											<DocDataForm
												document={item}
												updateDocument={this.updateDocument(index)}
												docTitle="Файл документа"
												title="Тип документа"
												dictionaryTypes={dictionaryDocTypes && dictionaryDocTypes.values}
												subTitle={'Название документа'}
												dictionarySubTypes={docType && dictionarySubDocTypes}
												extraFields={
													item.docType && item.docType.id === 1 && item.docSubType && item.docSubType.id === 1 ? (
														<TextInput
															label="Код подразделения"
															type="number"
															placeholder={'Введите код подразделения'}
															onChange={this.onChangeCodeDepartment(index)}
														/>
													) : null
												}
											/>
											<div className={styles.deleteDocButtonContainer}>
												<Button className={styles.deleteDocButton} variant="contained" onClick={this.deleteDoc(index)}>
													{'Удалить документ'}
												</Button>
											</div>
										</div>
									);
								})}
							</div>
							<div className={styles.addDocButtonContainer}>
								<Button className={styles.addDocButton} variant="contained" onClick={this.addDoc}>
									{'Добавить новый документ'}
								</Button>
							</div>
							<div className={styles.nextButtonContainer}>
								<Button variant="contained" color="primary" disabled={isDisabledAddButton} onClick={this.submit}>
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

export default DocumentsDataForm;
