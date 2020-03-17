import React, { ReactElement } from 'react';
import { TextInput, Select, IFormField, Column, DownloadFile, Checkbox } from '@black_bird/components';
import { noop, IDocument, validateRequireTextField } from '$common';
import { isNotEmptyArray } from '@black_bird/utils';
import classes from './DocumentForm.module.css';

type IDictionary = Record<any, any>;

interface IDocumentFormProps {
	document: IDocument;
	onChange: (data: IFormField) => void;
	name: string;
	dictionaryTypes?: IDictionary[];
	dictionarySubTypes?: IDictionary[];
	dictionaryGovernment?: IDictionary[];
	governmentTitle: string;
	title: string;
	subTitle: string;
	fileTitle: string;
	extraFields?: ReactElement<any> | null;
	startFields?: ReactElement<any> | null;
	endFields?: ReactElement<any> | null;
}

class DocumentForm extends React.PureComponent<IDocumentFormProps, { hasNumber: boolean; file: File | null }> {
	static defaultProps = {
		selectDocType: noop,
		selectDocSubType: noop,
		classes: {},
		name: 'document',
		title: '',
		governmentTitle: '',
		subTitle: '',
		fileTitle: '',
	};
	state = {
		hasNumber: false,
		file: null,
	};
	onChangeHasNumber = () => {
		this.setState({ hasNumber: !this.state.hasNumber });
	};
	onChange = (field: IFormField) => {
		const { document, onChange, name } = this.props;

		onChange({
			name,
			value: {
				...document,
				[field.name]: field.value,
			},
		});
	};
	onDownloadFile = (field: IFormField) => {
		const { document, onChange, name } = this.props;

		onChange({
			name,
			value: {
				...document,
				[field.name]: {
					name: field.value.name,
					lastModified: field.value.lastModified,
					type: field.value.type,
					size: field.value.size,
				},
			},
		});
		this.setState({ file: field.value });
	};

	render() {
		const {
			name,
			dictionaryGovernment,
			governmentTitle,
			dictionarySubTypes,
			subTitle,
			fileTitle,
			title,
			endFields,
			startFields,
		} = this.props;
		const { type, file = null, government, subType, num, series, issieBy } = this.props.document;
		const needInfo = type && type.need_info;
		const hasNumber = (type && type.has_num) || false;

		return (
			<div className={classes.form}>
				<Column>
					{startFields}
					{isNotEmptyArray(dictionaryGovernment) && governmentTitle && (
						<Select
							name="government"
							value={government}
							required
							onChange={this.onChange}
							options={dictionaryGovernment}
							placeholder={`Выберите ${governmentTitle.toLowerCase()}`}
							title={governmentTitle}
						/>
					)}

					{this.props.dictionaryTypes && title && (
						<Select
							onChange={this.onChange}
							value={type}
							name="type"
							required
							options={this.props.dictionaryTypes}
							placeholder={`Выберите ${this.props.title.toLowerCase()}`}
							title={this.props.title}
						/>
					)}

					{isNotEmptyArray(dictionarySubTypes) && subTitle && (
						<Select
							onChange={this.onChange}
							name="subType"
							required
							value={subType}
							options={this.props.dictionarySubTypes}
							placeholder={`Выберите ${this.props.subTitle.toLowerCase()}`}
							title={this.props.subTitle}
						/>
					)}

					{needInfo ? (
						<TextInput
							value={series}
							onChange={this.onChange}
							validate={validateRequireTextField}
							required
							name="series"
							placeholder="Введите серию документа"
							label="Серия"
						/>
					) : null}

					<div className={classes.numWrapper}>
						{hasNumber ? (
							<TextInput
								required={!!hasNumber}
								disabled={this.state.hasNumber}
								value={num}
								onChange={this.onChange}
								validate={validateRequireTextField}
								name="num"
								placeholder="Введите номер документа"
								label="Номер"
							/>
						) : null}

						{hasNumber && (
							<div>
								<Checkbox
									name="hasNumber"
									margin="none"
									value={this.state.hasNumber}
									className={classes.hasNumberCheckbox}
									onChange={this.onChangeHasNumber}
									label="Нет номера"
								/>
							</div>
						)}
					</div>

					{needInfo ? (
						<>
							<TextInput
								onChange={this.onChange}
								required
								type="date"
								name={`${name}docDate`}
								label="Дата выдачи документа"
							/>
							<TextInput
								required
								value={issieBy}
								onChange={this.onChange}
								placeholder="Введите кем выдан документ"
								label="Кем выдан документ"
								name="issieBy"
								multiline
							/>
						</>
					) : null}
					{endFields}
				</Column>
				<DownloadFile name="file" file={this.state.file} onChange={this.onDownloadFile} title={fileTitle} />
			</div>
		);
	}
}

export default DocumentForm;
