import React from 'react';
import classNames from 'classnames';
import { TextInput, DocumentForm, Button, H2 } from '$components';
import {
	EDictionaryNameList,
	validateDataForm,
	inputValueAsString,
	IDocument,
	defaultDocument,
	validateDocument,
	IDocType,
	IStylable,
} from '$common';

import styles from './styles';
import { IDictionaryState } from '@mgutm-fcu/dictionary';
import LoadingButton from '../Buttons/LoadingButtont';
import withStyles from '@material-ui/core/styles/withStyles';

interface IProps extends IStylable {
	isForeigner: boolean;
	dictionaries: IDictionaryState;
	documents: IDocument[];
	updateForm: (data: IDocument[]) => void;
}

interface IState {
	documents: IDocument[];
}

class DocumentsForm extends React.PureComponent<IProps> {
	static defaultProps = {
		isForeigner: false,
		classes: {},
	};

	deleteDoc = (index: number) => () => {
		const documents = this.props.documents.filter((_: IDocument, key: number) => key !== index);
		this.props.updateForm(documents);
	};
	addDoc = () => {
		const documents = [...this.props.documents, { ...defaultDocument }];
		this.props.updateForm(documents);
	};
	updateDocument = (index: number) => (document: IDocument) => {
		const documents = this.props.documents.filter((_: IDocument, key: number) => key !== index);
		this.props.updateForm(documents);
	};
	onChangeCodeDepartment = (index: number): React.ChangeEventHandler<HTMLInputElement> => event => {
		const document = this.props.documents[index];
		const documents = this.props.documents.filter((_: IDocument, key: number) => key !== index);

		this.props.updateForm([...documents, { ...document, codeDepartment: inputValueAsString(event) }]);
	};
	render() {
		const { dictionaries, classes } = this.props;
		const dictionaryDocTypes = this.props.dictionaries[EDictionaryNameList.DocTypes];
		const isDisabledAddButton = this.props.documents.map(validateDocument).includes(false);

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
					{this.props.documents.map((item: IDocument, index) => {
						const docType = item.docType && item.docType.id;
						const dictionarySubDocTypes =
							docType === 1
								? dictionaries[EDictionaryNameList.PersonDocTypes].values
								: docType === 2
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
										item.docType && item.docType.id === 1 && item.docSubType && item.docSubType.id === 1 ? (
											<TextInput
												defaultValue={item.codeDepartment}
												label="Код подразделения"
												type="number"
												placeholder={'Введите код подразделения'}
												onChange={this.onChangeCodeDepartment(index)}
											/>
										) : null
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
