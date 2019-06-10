import React from 'react';
import { TextInput, DocumentForm, Button, H2 } from '$components';
import {
	EDictionaryNameList,
	inputValueAsString,
	IDocument,
	defaultDocument,
	validateDocument,
	IDocType,
	ISelectItem,
	IStylable,
} from '$common';

import styles from './styles';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import withStyles from '@material-ui/core/styles/withStyles';

interface IProps extends IStylable {
	documents: IDocument[];
	dictionaries: DictionaryState;
	foreigner: boolean;
	updateDocument: (key: number, document: IDocument) => void;
	removeDocument: (key: number) => void;
	addDocument: () => void;
	submit: () => void;
}

class DocumentsFormView extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};

	updateDocument = (index: number) => (document: IDocument) => {
		this.props.updateDocument(index, document);
	};
	onChangeCodeDepartment = (
		index: number,
		document: IDocument,
	): React.ChangeEventHandler<HTMLInputElement> => event => {
		this.props.updateDocument(index, { ...document, codeDepartment: inputValueAsString(event) });
	};
	removeDocument = (index: number) => () => {
		this.props.removeDocument(index);
	};

	render() {
		const { dictionaries, classes } = this.props;
		const dictionaryDocTypes = this.props.dictionaries[EDictionaryNameList.DocTypes];
		const isDisabledAddButton = this.props.documents.map(validateDocument).includes(false);

		return (
			<form noValidate={true} className="flexColumn">
				{/*<div>*/}
				{/*<H2 style={{ marginTop: 10 }}>Необходимые документы для поступления:</H2>*/}
				{/*<ol>*/}
				{/*{this.props.foreigner &&*/}
				{/*dictionaryDocTypes &&*/}
				{/*dictionaryDocTypes.values*/}
				{/*.map((item: IDocType) => {*/}
				{/*if (item.need_foreigner) {*/}
				{/*return <li key={item.id}>{item.name}</li>;*/}
				{/*}*/}

				{/*return null;*/}
				{/*})*/}
				{/*.filter(Boolean)}*/}
				{/*</ol>*/}
				{/*</div>div*/}
				<div>
					{this.props.documents.map((item, index) => {
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
									docTitle="Файл документа"
									title="Тип документа"
									dictionaryTypes={dictionaryDocTypes && dictionaryDocTypes.values}
									subTitle={'Название документа'}
									dictionarySubTypes={dictionarySubDocTypes}
									extraFields={
										<React.Fragment>
											{docTypeId === 1 && item.docSubType && item.docSubType.id === 1 ? (
												<TextInput
													name="codeDepartment"
													label="Код подразделения"
													type="number"
													placeholder={'Введите код подразделения'}
												/>
											) : null}
										</React.Fragment>
									}
								/>
								<div className={classes.deleteDocButtonContainer}>
									<Button className={classes.deleteDocButton} primary onClick={this.removeDocument(index)}>
										{'Удалить документ'}
									</Button>
								</div>
							</div>
						);
					})}
				</div>
				<div className={classes.addDocButtonContainer}>
					<Button
						primary
						className={classes.addDocButton}
						disabled={isDisabledAddButton}
						onClick={this.props.addDocument}>
						{'Добавить новый документ'}
					</Button>
				</div>
				<div style={{ marginTop: 24 }}>
					<Button onClick={this.props.submit}>Далее</Button>
				</div>
			</form>
		);
	}
}

export default withStyles(styles)(DocumentsFormView);
