import React, { createRef, ReactElement, useCallback } from 'react';
import { TextInput } from '../Inputs';
import DropdownSelect from '../DropdownSelect';
import { Formik, FieldProps, FormikProps } from 'formik';
import styles from './styles';
import { noop, IDocument, IStylable, validateRequireTextField } from '$common';
import { IDictionary } from '@mgutm-fcu/dictionary';

import DownloadFileView from '../DownloadFile';
import Dropzone from 'react-dropzone';

interface IDocumentFormProps extends IStylable {
	document: IDocument;
	name: string;
	dictionaryTypes?: IDictionary[];
	dictionarySubTypes?: IDictionary[];
	dictionaryGovernment?: IDictionary[];
	governmentTitle?: string;
	title?: string;
	subTitle?: string;
	docTitle?: string;
	extraFields?: ReactElement<any> | null;
}

class DocumentForm extends React.PureComponent<IDocumentFormProps> {
	static defaultProps = {
		selectDocType: noop,
		selectDocSubType: noop,
		classes: {},
		name: '',
	};

	render() {
		const { name } = this.props;
		const { docType } = this.props.document;
		const isDataVisible = !!(
			(this.props.dictionaryTypes && this.props.title) ||
			(this.props.dictionarySubTypes && this.props.subTitle) ||
			(docType && docType.need_info) ||
			this.props.extraFields
		);
		const needInfo = docType && docType.need_info;
		const hasNumber = docType && docType.has_number;

		return (
			<div style={styles.docDataForm}>
				{isDataVisible ? (
					<div style={styles.dataContainer}>
						{this.props.dictionaryTypes && this.props.title && (
							<DropdownSelect
								required
								name={`${name}docType`}
								options={this.props.dictionaryTypes}
								placeholder={`Выберите ${this.props.title.toLowerCase()}`}
								title={this.props.title}
							/>
						)}

						{this.props.dictionaryGovernment && this.props.governmentTitle && (
							<DropdownSelect
								required
								name={`${name}docGovernment`}
								options={this.props.dictionaryGovernment}
								placeholder={`Выберите ${this.props.governmentTitle.toLowerCase()}`}
								title={this.props.governmentTitle}
							/>
						)}

						{this.props.dictionarySubTypes && this.props.subTitle && (
							<DropdownSelect
								required
								name={`${name}docSubType`}
								options={this.props.dictionarySubTypes}
								placeholder={`Выберите ${this.props.subTitle.toLowerCase()}`}
								title={this.props.subTitle}
							/>
						)}
						{needInfo ? (
							<TextInput
								validate={validateRequireTextField}
								required
								name={`${name}docSeries`}
								placeholder="Введите серию документа"
								label="Серия"
							/>
						) : null}

						{hasNumber ? (
							<TextInput
								required
								validate={validateRequireTextField}
								name={`${name}docNumber`}
								placeholder="Введите номер документа"
								label="Номер"
							/>
						) : null}

						{needInfo ? (
							<>
								<TextInput required type="date" name={`${name}docDate`} label="Дата выдачи документа" />
								<TextInput
									required
									validate={validateRequireTextField}
									placeholder="Введите кем выдан документ"
									label="Кем выдан документ"
									name={`${name}docIssieBy`}
									multiline
								/>
							</>
						) : null}

						{this.props.extraFields}
					</div>
				) : null}
				<div>
					<DownloadFileView name={`${this.props.name}docFile`} title={this.props.docTitle} />
				</div>
			</div>
		);
	}
}

export default DocumentForm;
