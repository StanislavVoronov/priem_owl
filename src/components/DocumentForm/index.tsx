import React, { createRef, ReactElement, useCallback } from 'react';
import { TextInput } from '../Inputs';
import DropdownSelect from '../DropdownSelect';
import styles from './styles';
import { noop, IDocument, IStylable, validateRequireTextField } from '$common';
import { IDictionary } from '@mgutm-fcu/dictionary';

import DownloadFileView from '../DownloadFile';
import FieldWrapper from '../FieldWrapper';

interface IDocumentFormProps extends IStylable {
	document: IDocument;
	name: string;
	dictionaryTypes?: IDictionary[];
	dictionarySubTypes?: IDictionary[];
	dictionaryGovernment?: IDictionary[];
	governmentTitle: string;
	title: string;
	subTitle: string;
	docTitle: string;
	extraFields?: ReactElement<any> | null;
}

class DocumentForm extends React.PureComponent<IDocumentFormProps> {
	static defaultProps = {
		selectDocType: noop,
		selectDocSubType: noop,
		classes: {},
		name: '',
		title: '',
		governmentTitle: '',
		subTitle: '',
		docTitle: '',
	};

	render() {
		const documentFormName = this.props.name;
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
							<FieldWrapper name={`${documentFormName}docType`}>
								{props => (
									<DropdownSelect
										{...props}
										required
										options={this.props.dictionaryTypes}
										placeholder={`Выберите ${this.props.title.toLowerCase()}`}
										title={this.props.title}
									/>
								)}
							</FieldWrapper>
						)}
						{this.props.dictionaryGovernment && this.props.governmentTitle && (
							<FieldWrapper name={`${documentFormName}docGovernment`}>
								{props => (
									<DropdownSelect
										{...props}
										required
										options={this.props.dictionaryGovernment}
										placeholder={`Выберите ${this.props.governmentTitle.toLowerCase()}`}
										title={this.props.governmentTitle}
									/>
								)}
							</FieldWrapper>
						)}
						{this.props.dictionarySubTypes && this.props.subTitle && (
							<FieldWrapper name={`${documentFormName}docSubType`}>
								{props => (
									<DropdownSelect
										{...props}
										required
										options={this.props.dictionarySubTypes}
										placeholder={`Выберите ${this.props.subTitle.toLowerCase()}`}
										title={this.props.subTitle}
									/>
								)}
							</FieldWrapper>
						)}
						{needInfo ? (
							<TextInput
								validate={validateRequireTextField}
								required
								name={`${documentFormName}docSeries`}
								placeholder="Введите серию документа"
								label="Серия"
							/>
						) : null}

						{hasNumber ? (
							<TextInput
								required
								validate={validateRequireTextField}
								name={`${documentFormName}docNumber`}
								placeholder="Введите номер документа"
								label="Номер"
							/>
						) : null}

						{needInfo ? (
							<>
								<TextInput required type="date" name={`${documentFormName}docDate`} label="Дата выдачи документа" />
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
					<FieldWrapper name={`${name}docFile`}>
						{props => <DownloadFileView {...props} file={props.value} title={this.props.docTitle} />}
					</FieldWrapper>
				</div>
			</div>
		);
	}
}

export default DocumentForm;
