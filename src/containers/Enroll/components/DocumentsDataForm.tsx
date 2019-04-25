import React from 'react';
import { IDocData, IDocDataItem } from '../models';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { defaultDocDataForm, DocDataForm, ISelectItem, TextInput } from '../../../platform';
import { EDictionaryNameList, inValidateDataForm, IDocType } from '../../../common';

import styles from './styles.css';
import { DictionaryContext } from '../EnrollContainer';

interface IOwnProps {
	submit(data: IDocDataItem[]): void;
	classes: Record<string, string>;
}
interface IDocDataForm extends IDocData {}

interface IState {
	documents: IDocDataForm[];
}

type IProps = IOwnProps;

class DocumentsDataForm extends React.PureComponent<IProps, IState> {
	static defaultProps = {
		classes: {},
	};
	state = {
		documents: [],
	};
	addDoc = () => {
		this.setState({ documents: [...this.state.documents, { ...defaultDocDataForm }] });
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
	selectDocType = (index: number) => {
		return (type: IDocType) => {
			const documents: IDocDataForm[] = [...this.state.documents];

			if (type.id > 2) {
				documents[index] = {
					...defaultDocDataForm,
					...documents[index],
					docType: type,
				};
			} else {
				documents[index].docType = type;
			}

			this.setState({ documents });
		};
	};
	selectDocSubType = (index: number) => (type: IDocType) => {
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
			<DictionaryContext.Consumer>
				{dictionaries => {
					const dictionaryDocTypes = dictionaries[EDictionaryNameList.DocTypes];
					const isDisabledAddButton = this.state.documents.map(inValidateDataForm).includes(true);

					return (
						<div className={styles.flexColumn}>
							<div>
								{this.state.documents.map((item: IDocDataForm, index) => {
									const docType = item.docType && item.docType.id;

									const dictionarySubDocTypes =
										docType === 1
											? dictionaries[EDictionaryNameList.PersonDocTypes].values
											: docType === 2
											? dictionaries[EDictionaryNameList.EducationDocTypes].values
											: undefined;

									return (
										<div className={classNames(styles.flexColumn, styles.docFormContainer)}>
											<DocDataForm
												needInfo={item.docType ? item.docType.needInfo : false}
												hasNumber={item.docType ? item.docType.hasNumber : false}
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
