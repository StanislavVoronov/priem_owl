import React from 'react';
import {
	Button,
	withStyles,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpandMoreIcon,
	Typography,
	ExpansionPanelDetails,
} from '$components';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import {
	IDocument,
	validateDocument,
	IStylable,
	EDictionaryNameList,
	AnyDocumentFormSchema,
	prop,
	IDocumentsForm,
	propOr,
	defaultDocument,
} from '$common';
import styles from './styles';
import classes from './styles.module.css';
import { FormikProps, FieldArray } from 'formik';

interface IProps extends IStylable, IDocumentsForm {
	dictionaries: any;
	requiredDocuments: number[];
	submit: (values: IDocumentsForm) => void;
}
interface IState {
	panelStatus: number[];
}
class DocumentsFormView extends React.PureComponent<IProps, IState> {
	static defaultProps = {
		classes: {},
	};
	state: IState = {
		panelStatus: [],
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

		const needDocuments = dictionaryDocTypes
			? dictionaryDocTypes.values.filter((item: any) => this.props.requiredDocuments.includes(item.id))
			: [];

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
						{needDocuments.map((item: any) => (
							<li
								className={
									form.values.documents.some(doc => propOr('', 'id', doc.docType) === item.id)
										? classes.tick
										: classes.cross
								}>
								{item.name}
							</li>
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
								{/*<DocumentForm*/}
								{/*	name={`documents[${index}].`}*/}
								{/*	onChange = {onChange}*/}
								{/*	document={item}*/}
								{/*	docTitle="Файл документа"*/}
								{/*	title="Тип документа"*/}
								{/*	dictionaryTypes={dictionaryDocTypes && dictionaryDocTypes.values}*/}
								{/*	subTitle={'Название документа'}*/}
								{/*	dictionarySubTypes={dictionarySubDocTypes}*/}
								{/*	extraFields={*/}
								{/*		<React.Fragment>*/}
								{/*			{docTypeId === 1 && docSubTypeId === 1 ? (*/}
								{/*				<TextInput*/}
								{/*					name={`documents[${index}].codeDepartment`}*/}
								{/*					label="Код подразделения"*/}
								{/*					type="number"*/}
								{/*					placeholder={'Введите код подразделения'}*/}
								{/*				/>*/}
								{/*			) : null}*/}
								{/*			<Button*/}
								{/*				wrapperClassName={classes.deleteDocButtonContainer}*/}
								{/*				className={classes.deleteDocButton}*/}
								{/*				primary*/}
								{/*				onClick={this.removeDocument(index, remove)}>*/}
								{/*				{'Удалить документ'}*/}
								{/*			</Button>*/}
								{/*		</React.Fragment>*/}
								{/*	}*/}
								{/*/>*/}
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
		return !this.props.requiredDocuments.every(docId => {
			return form.values.documents.some(doc => propOr('', 'id', doc.docType) === docId && validateDocument(doc));
		});
	};
	render() {
		return (
			<>
				{/*<PriemForm*/}
				{/*	schema={AnyDocumentFormSchema}*/}
				{/*	buttonText={'Далее'}*/}
				{/*	initialValues={{ documents: this.props.documents, priemGroupNeedDoc: this.props.priemGroupNeedDoc }}*/}
				{/*	onSubmit={this.props.submit}*/}
				{/*	disabled={this.disabledForm}*/}
				{/*	renderForm={this.renderFieldArray}*/}
				{/*/>*/}
			</>
		);
	}
}

export default withStyles(styles)(DocumentsFormView);
