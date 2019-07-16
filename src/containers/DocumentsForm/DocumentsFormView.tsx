import React from 'react';
import {
	TextInput,
	DocumentForm,
	Button,
	PriemForm,
	withStyles,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpandMoreIcon,
	Typography,
	ExpansionPanelDetails,
} from '$components';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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
import classes from './styles.module.css';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { FormikProps, FieldArray } from 'formik';

interface IProps extends IStylable, IDocumentsForm {
	dictionaries: DictionaryState;
	foreigner: boolean;
	submit: (values: IDocumentsForm) => void;
}
interface IState {
	panelStatus: number[];
	requiredDocuments: number[];
}
class DocumentsFormView extends React.PureComponent<IProps, IState> {
	static defaultProps = {
		classes: {},
	};
	state: IState = {
		panelStatus: [],
		requiredDocuments: [9, 10],
	};
	removeDocument = (index: number, remove: (index: number) => void) => () => {
		remove(index);
	};
	addDocument = (push: (doc: IDocument) => void) => () => {
		this.setState({ panelStatus: [this.state.panelStatus.length] });

		push(defaultDocument);
	};
	togglePanel = (index: number) => () => {
		if (this.state.panelStatus.includes(index)) {
			this.setState({ panelStatus: this.state.panelStatus.filter(item => item !== index) });
		} else {
			this.setState({ panelStatus: [...this.state.panelStatus, index] });
		}
	};
	renderDocument = (form: FormikProps<IDocumentsForm>) => ({ push, remove }: any) => {
		const isDisabledAddButton = form.values.documents.map(validateDocument).includes(false);

		const dictionaryDocTypes = this.props.dictionaries[EDictionaryNameList.DocTypes];
		const docForEducation = form.values.documents.some(item =>
			item.docType && item.docFile ? item.docType.id === 9 || item.docType.id === 10 : false,
		);

		const needDocuments =
			dictionaryDocTypes && dictionaryDocTypes.values.filter(item => this.state.requiredDocuments.includes(item.id));

		return (
			<>
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader component="div" id="nested-list-subheader">
							<b>
								<u>Список необходимых документов</u>
							</b>
						</ListSubheader>
					}
					className={classes.root}>
					<ul className={classes.list}>
						<li className={classes.tick}>Документ, удостоверающий личность</li>
						<li className={classes.tick}>Документ о регистрации места жительства</li>
						<li className={classes.tick}>Документ о предыдущем образовании</li>
						{needDocuments.map(item => (
							<li className={classes.tick}>{item.name}</li>
						))}
					</ul>
				</List>
				{form.values.documents.map((item, index) => {
					const { dictionaries } = this.props;
					const { docType, docSubType } = item;

					const docTypeId = docType && prop('id')(docType);
					const docSubTypeId = docSubType && prop('id')(docSubType);

					const dictionarySubDocTypes =
						docTypeId === 1
							? dictionaries[EDictionaryNameList.PersonDocTypes].values
							: docTypeId === 2
							? dictionaries[EDictionaryNameList.EducationDocTypes].values
							: undefined;

					return (
						<ExpansionPanel
							onChange={this.togglePanel(index)}
							expanded={this.state.panelStatus.includes(index)}
							className={classes.expansionPanel}
							key={`${index}-${docTypeId}-${docSubTypeId}-${item.docNumber}`}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
								<Typography>
									<b>
										{`${index + 1}. `} {item.docType ? item.docType.name : 'Новый документ'}
									</b>
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails className="flexColumn">
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
									wrapperClassName={this.props.classes.deleteDocButtonContainer}
									className={this.props.classes.deleteDocButton}
									primary
									onClick={this.removeDocument(index, remove)}>
									{'Удалить документ'}
								</Button>
							</ExpansionPanelDetails>
						</ExpansionPanel>
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
	disabledForm = (form: FormikProps<IDocumentsForm>) => {
		return !form.values.documents.some(item =>
			item.docType && item.docFile ? item.docType.id === 9 || item.docType.id === 10 : false,
		);
	};
	render() {
		return (
			<>
				{/*<div>*/}
				{/*Для добавления заявления скачайте и прикрепите документ <b>только</b> с заполненную форму*/}
				{/*<a href="http://mgutm.ru/entrant_2012/files/prikazi/368d/prilojenie_19_3105.pdf" target="_blank">*/}
				{/*{' документ'}*/}
				{/*</a>*/}
				{/*</div>*/}
				<PriemForm
					schema={AnyDocumentFormSchema}
					buttonText={'Далее'}
					initialValues={{ documents: this.props.documents, priemGroupNeedDoc: this.props.priemGroupNeedDoc }}
					onSubmit={this.props.submit}
					disabled={this.disabledForm}
					renderForm={this.renderFieldArray}
				/>
			</>
		);
	}
}

export default withStyles(styles)(DocumentsFormView);
