import React, { ReactElement } from 'react';
import {
	TextInput,
	Select,
	IFormField,
	Column,
	DownloadFile,
	Checkbox,
} from '@black_bird/components';
import { noop, IDocument, validateRequireTextField } from '$common';
import { isNotEmptyArray, ITransaction } from '@black_bird/utils';
import classes from './DocumentForm.module.css';
import { FILE_MAX_SIZE, TYPE_DOCS } from '../../common';

type IDictionary = Record<any, any>;

interface IDocumentFormProps {
	document: IDocument;
	onChange: (data: IFormField) => void;
	name: string;
	dictionaryTypes?: ITransaction<IDictionary[]>;
	dictionarySubTypes?: ITransaction<IDictionary[]>;
	dictionaryGovernment?: ITransaction<IDictionary[]>;
	dictionaryCheatTypes?: ITransaction<IDictionary[]>;
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
			value: this.state.noNumber ? '' : '-',
		});
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
	onChangeType = (field: IFormField) => {
		const { document, onChange, name } = this.props;

		onChange({
			name,
			value: {
				...document,
				[field.name]: field.value,
				subType: null,
				cheatType: null,
			},
		});
	};
	render() {
		const {
			dictionaryGovernment,
			governmentTitle,
			dictionaryTypes,
			dictionarySubTypes,
			subTitle,
			fileTitle,
			title,
			endFields,
			startFields,
			dictionaryCheatTypes,
		} = this.props;
		const {
			type,
			file = null,
			government,
			cheatType = null,
			subType,
			num,
			series,
			issieBy,
		} = this.props.document;

		const filteredSubTypesDocDictionary = dictionarySubTypes
			? {
					...dictionarySubTypes,
					result: dictionarySubTypes.result.filter((item) => item.type === type?.id),
			  }
			: { result: [], exception: null, isFetching: false };

		const { noNumber } = this.state;
		const needInfo = type && type.need_info;
		const hasNumber = (type && type.has_num) || false;

		return (
			<div className={classes.form}>
				<Column>
					{startFields}

					{title && (
						<Select
							onChange={this.onChangeType}
							value={type}
							name="type"
							required
							error={dictionaryTypes?.exception?.comment}
							options={dictionaryTypes?.result}
							placeholder={`Выберите ${this.props.title.toLowerCase()}`}
							title={this.props.title}
						/>
					)}

					{type && type.id === 26 && (
						<Select
							onChange={this.onChange}
							value={cheatType}
							name="cheatType"
							required
							error={dictionaryCheatTypes?.exception?.comment}
							options={dictionaryCheatTypes?.result}
							placeholder={`Выберите категорию зачисления`}
							title="Категория зачисления"
						/>
					)}

					{subTitle && isNotEmptyArray(filteredSubTypesDocDictionary.result) && (
						<Select
							onChange={this.onChange}
							name="subType"
							required
							value={subType}
							error={filteredSubTypesDocDictionary?.exception?.comment}
							options={filteredSubTypesDocDictionary?.result}
							placeholder={`Выберите ${this.props.subTitle.toLowerCase()}`}
							title={this.props.subTitle}
						/>
					)}

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
								name="date"
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
					{type && type.id === 1 && subType && subType.id === 1 ? (
						<TextInput
							name="codeDepartment"
							onChange={this.onChange}
							label="Код подразделения"
							placeholder={'Введите код подразделения'}
						/>
					) : null}
					{endFields}
				</Column>
				<DownloadFile
					formats={TYPE_DOCS}
					maxSize={FILE_MAX_SIZE}
					name="file"
					file={file}
					onChange={this.onDownloadFile}
					title={fileTitle}
				/>
			</div>
		);
	}
}

export default DocumentForm;
