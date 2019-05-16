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
	validation: boolean;
}

class DocumentForm extends React.PureComponent<IDocumentFormProps> {
	public static defaultProps = {
		selectDocType: noop,
		selectDocSubType: noop,
		validation: false,
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
	onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		if (this.props.validation) {
			const document = { ...this.props.document, [event.target.name]: inputValueAsString(event) };
			this.props.updateDocument(document);
		}
	};
	onBlur: React.ChangeEventHandler<HTMLInputElement> = event => {
		const document = { ...this.props.document, [event.target.name]: inputValueAsString(event) };
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
	validateForm = (text?: string) => {
		if (this.props.validation) {
			return text ? void 0 : 'Поле не должно быть пустым';
		}

		return void 0;
	};
	render() {
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
									required
									defaultValue={this.props.document.docType}
									options={this.props.dictionaryTypes}
									placeholder={`Выберите ${this.props.title.toLowerCase()}`}
									onChange={this.selectDocType!}
									title={this.props.title}
								/>
							)}
							{this.props.dictionarySubTypes && this.props.subTitle && (
								<DropdownSelect
									required
									defaultValue={this.props.document.docSubType}
									options={this.props.dictionarySubTypes}
									placeholder={`Выберите ${this.props.subTitle.toLowerCase()}`}
									onChange={this.selectDocSubType!}
									title={this.props.subTitle}
								/>
							)}
							{needInfo && (
								<TextInput
									required
									onChange={this.onChange}
									hasError={!!this.validateForm(this.props.document.docSeries)}
									helperText={this.validateForm(this.props.document.docSeries)}
									name="docSeries"
									defaultValue={this.props.document.docSeries}
									placeholder="Введите серию документа"
									label="Серия"
									onBlur={this.onBlur}
								/>
							)}
							{hasNumber && (
								<TextInput
									onChange={this.onChange}
									defaultValue={this.props.document.docNumber}
									required
									name="docNumber"
									hasError={!!this.validateForm(this.props.document.docNumber)}
									helperText={this.validateForm(this.props.document.docNumber)}
									placeholder="Введите номер документа"
									label="Номер"
									type="number"
									onBlur={this.onBlur}
								/>
							)}
							{needInfo && (
								<React.Fragment>
									<TextInput
										onChange={this.onChange}
										required
										hasError={!!this.validateForm(this.props.document.docDate)}
										helperText={this.validateForm(this.props.document.docDate)}
										type="date"
										defaultValue={this.props.document.docDate}
										label="Дата выдачи документа"
										name="docDate"
										onBlur={this.onBlur}
									/>
									<TextInput
										required
										onChange={this.onChange}
										hasError={!!this.validateForm(this.props.document.docIssieBy)}
										helperText={this.validateForm(this.props.document.docIssieBy)}
										defaultValue={this.props.document.docIssieBy}
										placeholder="Введите кем выдан документ"
										label="Кем выдан документ"
										name="docIssieBy"
										multiline={true}
										onBlur={this.onBlur}
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
