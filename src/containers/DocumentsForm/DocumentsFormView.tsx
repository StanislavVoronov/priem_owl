import React from 'react';
import { TextInput, DocumentForm, Button, PriemForm, withStyles } from '$components';
import {
	IDocument,
	validateDocument,
	IStylable,
	EDictionaryNameList,
	AnyDocumentFormSchema,
	prop,
	IDocumentsForm,
	defaultDocument,
} from '$common';
import styles from './styles';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { FormikProps, FieldArray } from 'formik';

interface IProps extends IStylable {
	documents: IDocument[];
	dictionaries: DictionaryState;
	foreigner: boolean;
	submit: (values: IDocumentsForm) => void;
}

class DocumentsFormView extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};
	removeDocument = (index: number, remove: (index: number) => void) => () => {
		remove(index);
	};
	addDocument = (push: (doc: IDocument) => void) => () => {
		push(defaultDocument);
	};

	renderDocument = (form: FormikProps<IDocumentsForm>) => ({ push, remove }: any) => {
		const isDisabledAddButton = form.values.documents.map(validateDocument).includes(false);

		return (
			<>
				{form.values.documents.map((item, index) => {
					const { dictionaries, classes } = this.props;
					const { docType, docSubType } = item;
					const dictionaryDocTypes = this.props.dictionaries[EDictionaryNameList.DocTypes];

					const docTypeId = docType && prop('id')(docType);
					const docSubTypeId = docSubType && prop('id')(docSubType);

					const dictionarySubDocTypes =
						docTypeId === 1
							? dictionaries[EDictionaryNameList.PersonDocTypes].values
							: docTypeId === 2
							? dictionaries[EDictionaryNameList.EducationDocTypes].values
							: undefined;

					return (
						<div style={{ marginTop: 24 }} key={`${index}-${docTypeId}-${docSubTypeId}-${item.docNumber}`}>
							<DocumentForm
								name={`documents[${index}].`}
								document={item}
								docTitle="Файл документа"
								title="Тип документа"
								dictionaryTypes={dictionaryDocTypes && dictionaryDocTypes.values}
								subTitle={'Название документа'}
								dictionarySubTypes={dictionarySubDocTypes}
								extraFields={
									<React.Fragment>
										{docTypeId === 1 && docSubTypeId === 1 ? (
											<TextInput
												name={`documents[${index}].codeDepartment`}
												label="Код подразделения"
												type="number"
												placeholder={'Введите код подразделения'}
											/>
										) : null}
									</React.Fragment>
								}
							/>

							<Button
								wrapperClassName={classes.deleteDocButtonContainer}
								className={classes.deleteDocButton}
								primary
								onClick={this.removeDocument(index, remove)}>
								{'Удалить документ'}
							</Button>
						</div>
					);
				})}
				<Button
					primary
					wrapperClassName={this.props.classes.addDocButtonWrapper}
					className={this.props.classes.addDocButton}
					disabled={isDisabledAddButton}
					onClick={this.addDocument(push)}>
					Добавить новый документ
				</Button>
			</>
		);
	};
	renderFieldArray = (form: FormikProps<IDocumentsForm>) => {
		return <FieldArray validateOnChange={false} name="documents" render={this.renderDocument(form)} />;
	};
	render() {
		return (
			<PriemForm
				schema={AnyDocumentFormSchema}
				buttonText={'Далее'}
				initialValues={{ documents: this.props.documents }}
				onSubmit={this.props.submit}
				renderForm={this.renderFieldArray}
			/>
		);
	}
}

export default withStyles(styles)(DocumentsFormView);
