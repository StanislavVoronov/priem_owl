import React, { createRef, ReactElement, useCallback } from 'react';
import { TextInput } from '../Inputs';
import DropdownSelect from '../DropdownSelect';
import RootRef from '@material-ui/core/RootRef';

import Dropzone from 'react-dropzone';
import styles from './styles';
import { IDocType, inputValueAsString, noop, IDocument, IStylable, ISelectItem } from '$common';
import { IDictionary } from '@mgutm-fcu/dictionary';
import ImageEditor from '../ImageEditor';
import { FormLabel } from '@material-ui/core';

interface IDocumentFormProps extends IStylable {
	document: IDocument;
	dictionaryTypes?: IDictionary[];
	dictionarySubTypes?: IDictionary[];
	dictionaryGovernment?: IDictionary[];
	governmentTitle?: string;
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
	selectGovernment = (item: ISelectItem) => {
		const document = { ...this.props.document, docGovernment: item };
		this.props.updateDocument(document);
	};
	validateForm = (text?: string) => {
		if (this.props.validation) {
			return text ? void 0 : 'Поле не должно быть пустым';
		}

		return void 0;
	};
	render() {
		const isDataVisible = !!(
			(this.props.dictionaryTypes && this.props.title) ||
			(this.props.dictionarySubTypes && this.props.subTitle) ||
			(this.props.document.docType && this.props.document.docType.need_info) ||
			this.props.extraFields
		);
		const needInfo = this.props.document.docType && this.props.document.docType.need_info;
		const hasNumber = this.props.document.docType && this.props.document.docType.has_number;

		return (
			<div style={styles.docDataForm}>
				{isDataVisible && (
					<div style={styles.dataContainer}>
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
						{this.props.dictionaryGovernment && this.props.governmentTitle && (
							<DropdownSelect
								required
								defaultValue={this.props.document.docGovernment}
								options={this.props.dictionaryGovernment}
								placeholder={`Выберите ${this.props.governmentTitle.toLowerCase()}`}
								onChange={this.selectGovernment!}
								title={this.props.governmentTitle}
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
						{needInfo && <TextInput required name="docSeries" placeholder="Введите серию документа" label="Серия" />}
						{hasNumber && (
							<TextInput required name="docNumber" placeholder="Введите номер документа" label="Номер" type="number" />
						)}
						{needInfo && (
							<>
								<TextInput required type="date" label="Дата выдачи документа" name="docDate" />
								<TextInput
									required
									placeholder="Введите кем выдан документ"
									label="Кем выдан документ"
									name="docIssieBy"
									multiline={true}
								/>
							</>
						)}

						{this.props.extraFields}
					</div>
				)}
				<div style={styles.documentContainer}>
					<Dropzone onDrop={this.onDownload}>
						{props => (
							<div {...props.getRootProps()} style={styles.fileContainer}>
								{this.props.docTitle && (
									<div style={{ display: 'flex', flexDirection: 'row' }}>
										<FormLabel style={{ fontSize: '.875rem', marginRight: 2 }}>{this.props.docTitle}</FormLabel>
										<FormLabel style={{ color: 'red' }}>{'*'}</FormLabel>
									</div>
								)}
								{this.props.document.docFile ? (
									<ImageEditor
										title={this.props.document.docFile.name}
										file={this.props.document.docFile}
										removeImage={this.deleteDocument}
									/>
								) : (
									<React.Fragment>
										<input {...props.getInputProps()} />
										<div style={styles.dropZone}>
											Нажмите, чтобы добавить файл или перетащите файл в отмеченную область
										</div>
									</React.Fragment>
								)}
							</div>
						)}
					</Dropzone>
				</div>
			</div>
		);
	}
}

export default DocumentForm;
