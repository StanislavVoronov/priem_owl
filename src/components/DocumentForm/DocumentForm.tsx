import React, { ReactElement } from 'react';
import { TextInput, Select, IFormField, Column, DownloadFile, Checkbox } from '@black_bird/components';
import { noop, IDocument, validateRequireTextField } from '$common';
import { isNotEmptyArray, ITransaction } from '@black_bird/utils';
import classes from './DocumentForm.module.css';

type IDictionary = Record<any, any>;

interface IDocumentFormProps {
	document: IDocument;
	onChange: (data: IFormField) => void;
	name: string;
	dictionaryTypes?: ITransaction<IDictionary>;
	dictionarySubTypes?: ITransaction<IDictionary>;
	dictionaryGovernment?: ITransaction<IDictionary>;
	governmentTitle: string;
	title: string;
	subTitle: string;
	fileTitle: string;
	extraFields?: ReactElement<any> | null;
	startFields?: ReactElement<any> | null;
	endFields?: ReactElement<any> | null;
}

class DocumentForm extends React.PureComponent<IDocumentFormProps, { noNumber: boolean }> {
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
		noNumber: false,
	};
	onChangeHasNumber = () => {

		this.setState({ noNumber: !this.state.noNumber });

		this.props.onChange({
			name: 'num',
			value: this.state.noNumber ? '' : '-'
		})
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
				[field.name]: field.value,
			},
		});
	};

	render() {
		const {
			name,
			dictionaryGovernment,
			governmentTitle,
			dictionaryTypes,
			dictionarySubTypes,
			subTitle,
			fileTitle,
			title,
			endFields,
			startFields,
		} = this.props;
		const { type, file = null, government, subType, num, series, issieBy } = this.props.document;
		const { noNumber } = this.state;
		const needInfo = type && type.need_info;
		const hasNumber = (type && type.has_num) || false;

		return (
			<div className={classes.form}>
				<Column>
					{startFields}
					{governmentTitle && (
						<Select
							name="government"
							value={government}
							required
							error={dictionaryGovernment?.exception?.comment}
							onChange={this.onChange}
							options={dictionaryGovernment?.result}
							placeholder={`Выберите ${governmentTitle.toLowerCase()}`}
							title={governmentTitle}
						/>
					)}

					{title && (
						<Select
							onChange={this.onChange}
							value={type}
							name="type"
							required
							error={dictionaryTypes?.exception?.comment}
							options={dictionaryTypes?.result}
							placeholder={`Выберите ${this.props.title.toLowerCase()}`}
							title={this.props.title}
						/>
					)}

					{subTitle && (
						<Select
							onChange={this.onChange}
							name="subType"
							required
							value={subType}
							error={dictionarySubTypes?.exception?.comment}
							options={dictionarySubTypes?.result}
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
								disabled={noNumber}
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
									value={this.state.noNumber}
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
				<DownloadFile name="file" file={file} onChange={this.onDownloadFile} title={fileTitle} />
			</div>
		);
	}
}

export default DocumentForm;
