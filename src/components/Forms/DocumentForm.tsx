import React, { ReactElement } from 'react';
import { TextInput, FormControl } from '..';
import DropdownSelect from '../DropdownSelect';
import Dropzone from 'react-dropzone';
import Image from '../ImageEditor';
import FormLabel from '@material-ui/core/FormLabel';
import styles from './styles';
import { IDocType, inputValueAsString, noop, IDocument, IStylable } from '$common';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';

interface IDocumentFormProps extends IStylable {
	document: IDocument;
	dictionaryTypes?: IDictionary[];
	dictionarySubTypes?: IDictionary[];
	title?: string;
	subTitle?: string;
	docTitle?: string;
	extraFields?: ReactElement<any> | null;
	updateDocument: (document: IDocument) => void;
}

class DocumentForm extends React.PureComponent<IDocumentFormProps> {
	public static defaultProps = {
		onChangeSeries: noop,
		onChangeNumber: noop,
		onChangeDate: noop,
		onChangeIssieBy: noop,
		selectDocType: noop,
		selectDocSubType: noop,
		classes: {},
	};
	selectDocType = (docType: IDocType) => {
		const document = { ...this.props.document, docType };
		this.props.updateDocument(document);
	};
	selectDocSubType = (docSubType: IDocType) => {
		const document = { ...this.props.document, docSubType };
		this.props.updateDocument(document);
	};
	onChangeIssieBy: React.ChangeEventHandler<HTMLInputElement> = event => {
		const document = { ...this.props.document, docIssieBy: inputValueAsString(event) };
		this.props.updateDocument(document);
	};
	onChangeDate: React.ChangeEventHandler<HTMLInputElement> = event => {
		const document = { ...this.props.document, docDate: inputValueAsString(event) };
		this.props.updateDocument(document);
	};
	onChangeSeries: React.ChangeEventHandler<HTMLInputElement> = event => {
		const document = { ...this.props.document, docSeries: inputValueAsString(event) };
		this.props.updateDocument(document);
	};
	onChangeNumber: React.ChangeEventHandler<HTMLInputElement> = event => {
		const document = { ...this.props.document, docNumber: inputValueAsString(event) };
		this.props.updateDocument(document);
	};
	onDownload = (acceptedFiles: File[]) => {
		acceptedFiles.forEach(file => {
			const reader = new FileReader();

			reader.onload = e => {
				const document = { ...this.props.document, docFile: file };
				this.props.updateDocument(document);
			};
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');

			reader.readAsBinaryString(file);
		});
	};
	deleteDocument = () => {
		const document = { ...this.props.document, docFile: null };
		this.props.updateDocument(document);
	};
	public render() {
		const { classes } = this.props;
		const isDataVisible = !!(
			(this.props.dictionaryTypes && this.props.title) ||
			(this.props.dictionarySubTypes && this.props.subTitle) ||
			(this.props.document.docType && this.props.document.docType.need_info) ||
			this.props.extraFields
		);
		const needInfo = this.props.document.docType && this.props.document.docType.need_info;
		const hasNumber = this.props.document.docType && this.props.document.docType.has_number;

		return (
			<FormControl>
				<div className={classes.docDataForm}>
					{isDataVisible && (
						<div className={classes.dataContainer}>
							{this.props.dictionaryTypes && this.props.title && (
								<DropdownSelect
									required={true}
									defaultValue={this.props.document.docType}
									options={this.props.dictionaryTypes}
									placeholder={`Выберите ${this.props.title.toLowerCase()}`}
									onChange={this.selectDocType!}
									title={this.props.title}
								/>
							)}
							{this.props.dictionarySubTypes && this.props.subTitle && (
								<DropdownSelect
									required={true}
									defaultValue={this.props.document.docSubType}
									options={this.props.dictionarySubTypes}
									placeholder={`Выберите ${this.props.subTitle.toLowerCase()}`}
									onChange={this.selectDocSubType!}
									title={this.props.subTitle}
								/>
							)}
							{needInfo && (
								<TextInput
									required={true}
									defaultValue={this.props.document.docSeries}
									placeholder="Введите серию документа"
									label="Серия"
									onBlur={this.onChangeSeries}
								/>
							)}
							{hasNumber && (
								<TextInput
									defaultValue={this.props.document.docNumber}
									required={true}
									placeholder="Введите номер документа"
									label="Номер"
									type="number"
									onBlur={this.onChangeNumber}
								/>
							)}
							{needInfo && (
								<React.Fragment>
									<TextInput
										required={true}
										type="date"
										defaultValue={this.props.document.docDate}
										label="Дата выдачи документа"
										onBlur={this.onChangeDate}
									/>
									<TextInput
										required={true}
										defaultValue={this.props.document.docIssieBy}
										placeholder="Введите кем выдан документ"
										label="Кем выдан документ"
										multiline={true}
										onBlur={this.onChangeIssieBy}
									/>
								</React.Fragment>
							)}

							{this.props.extraFields}
						</div>
					)}
					<div className={classes.documentContainer}>
						<Dropzone onDrop={this.onDownload}>
							{({ getRootProps, getInputProps }) => {
								return (
									<div {...getRootProps()} className={classes.fileContainer}>
										{this.props.docTitle && (
											<div className="flexRow">
												<FormLabel style={{ fontSize: '.875rem', marginRight: 2 }}>{this.props.docTitle}</FormLabel>
												<FormLabel style={{ color: 'red' }}>{'*'}</FormLabel>
											</div>
										)}
										{this.props.document.docFile ? (
											<React.Fragment>
												<Image
													title={this.props.document.docFile.name}
													file={this.props.document.docFile}
													removeImage={this.deleteDocument}
												/>
											</React.Fragment>
										) : (
											<React.Fragment>
												<input {...getInputProps()} />
												<div className={classes.dropZone}>
													Нажмите, чтобы добавить файл или перетащите файл в отмеченную область
												</div>
											</React.Fragment>
										)}
									</div>
								);
							}}
						</Dropzone>
					</div>
				</div>
			</FormControl>
		);
	}
}

export default withStyles(styles)(DocumentForm);
