import React from 'react';
import { TextInput, DocumentForm, Button, H2 } from '$components';
import {
	EDictionaryNameList,
	inputValueAsString,
	IDocument,
	defaultDocument,
	validateDocument,
	IDocType,
	IStylable,
	ISelectItem,
	IDocumentsForm,
} from '$common';

import styles from './styles';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import withStyles from '@material-ui/core/styles/withStyles';
import DropdownSelect from '../../components/DropdownSelect';

interface IProps extends IStylable {
	isForeigner: boolean;
	dictionaries: DictionaryState;
	defaultData: IDocumentsForm;
	updateForm: (data: IDocument[]) => void;
}

interface IState {
	cheatType: ISelectItem;
	documents: IDocument[];
}

class DocumentsForm extends React.PureComponent<IProps> {
	static defaultProps = {
		isForeigner: false,
		classes: {},
	};
	state = this.props.defaultData;
	deleteDoc = (index: number) => () => {
		const documents = this.state.documents.filter((_: IDocument, key: number) => key !== index);
		this.props.updateForm(documents);
	};
	addDoc = () => {
		const documents = [...this.state.documents, { ...defaultDocument }];
		this.props.updateForm(documents);
	};
	updateDocument = (index: number) => (document: IDocument) => {
		const documents = this.state.documents.filter((_: IDocument, key: number) => key !== index);
		this.props.updateForm([...documents, document]);
	};
	onChangeCodeDepartment = (index: number): React.ChangeEventHandler<HTMLInputElement> => event => {
		const document = this.state.documents[index];
		const documents = this.state.documents.filter((_: IDocument, key: number) => key !== index);

		this.props.updateForm([...documents, { ...document, codeDepartment: inputValueAsString(event) }]);
	};
	selectCheatType = (cheatType: ISelectItem) => {
		this.setState({ cheatType });
	};

	render() {
		const { dictionaries, classes } = this.props;
		const dictionaryDocTypes = this.props.dictionaries[EDictionaryNameList.DocTypes];
		const isDisabledAddButton = this.state.documents.map(validateDocument).includes(false);

		return (
			<div className="flexColumn">
				<div>
					<H2>Необходимые документы для поступления:</H2>
					<ol>
						{this.props.isForeigner &&
							dictionaryDocTypes &&
							dictionaryDocTypes.values
								.map((item: IDocType) => {
									if (item.need_foreigner) {
										return <li key={item.id}>{item.name}</li>;
									}

									return null;
								})
								.filter(Boolean)}
					</ol>
				</div>
				<div>
					{this.state.documents.map((item: IDocument, index) => {
						const docTypeId = (item.docType && item.docType.id) || '';
						const dictionarySubDocTypes =
							docTypeId === 1
								? dictionaries[EDictionaryNameList.PersonDocTypes].values
								: docTypeId === 2
								? dictionaries[EDictionaryNameList.EducationDocTypes].values
								: undefined;

						return (
							<div key={`${index}-${item.docNumber}-${item.docSeries}`} className={classes.docFormContainer}>
								<DocumentForm
									document={item}
									updateDocument={this.updateDocument(index)}
									docTitle="Файл документа"
									title="Тип документа"
									dictionaryTypes={dictionaryDocTypes && dictionaryDocTypes.values}
									subTitle={'Название документа'}
									dictionarySubTypes={dictionarySubDocTypes}
									extraFields={
										<React.Fragment>
											{docTypeId === 1 && item.docSubType && item.docSubType.id === 1 ? (
												<TextInput
													defaultValue={item.codeDepartment}
													label="Код подразделения"
													type="number"
													placeholder={'Введите код подразделения'}
													onChange={this.onChangeCodeDepartment(index)}
												/>
											) : null}
											{docTypeId === 26 ? (
												<DropdownSelect
													required={true}
													defaultValue={this.state.cheatType}
													options={dictionaries[EDictionaryNameList.PriemSpecialCategories].values}
													placeholder={`Выберите категорию поступления`}
													onChange={this.selectCheatType}
													title="Категория поступления"
												/>
											) : null}
										</React.Fragment>
									}
								/>
								<div className={classes.deleteDocButtonContainer}>
									<Button className={classes.deleteDocButton} primary onClick={this.deleteDoc(index)}>
										{'Удалить документ'}
									</Button>
								</div>
							</div>
						);
					})}
				</div>
				<div className={classes.addDocButtonContainer}>
					<Button primary className={classes.addDocButton} disabled={isDisabledAddButton} onClick={this.addDoc}>
						{'Добавить новый документ'}
					</Button>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(DocumentsForm);
