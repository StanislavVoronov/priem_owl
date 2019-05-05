import React from 'react';
import classNames from 'classnames';
import { TextInput, DocumentForm, Button } from '$components';
import {
	EDictionaryNameList,
	validateDataForm,
	inputValueAsString,
	IDocument,
	defaultDocument,
	validateDocument,
} from '$common';

import styles from './styles';
import { IDictionaryState } from '@mgutm-fcu/dictionary';
import LoadingButton from '../Buttons/LoadingButtont';
import withStyles from '@material-ui/core/styles/withStyles';

interface IOwnProps {
	dictionaries: IDictionaryState;
	defaultData: IDocument[];
	classes: Record<string, string>;
	submit(data: IDocument[]): void;
}

interface IState {
	documents: IDocument[];
}

type IProps = IOwnProps;

class DocumentsForm extends React.PureComponent<IProps, IState> {
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
		const { dictionaries, classes } = this.props;
		const dictionaryDocTypes = this.props.dictionaries[EDictionaryNameList.DocTypes];
		const isDisabledAddButton = this.state.documents.map(validateDocument).includes(false);

		return (
			<div className="flexColumn">
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
				<LoadingButton disabled={isDisabledAddButton} onClick={this.submit}>
					Подтвердить
				</LoadingButton>
			</div>
		);
	}
}

export default withStyles(styles)(DocumentsForm);
