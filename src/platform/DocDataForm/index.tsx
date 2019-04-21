import React, { ReactElement } from 'react';
import { TextInput, FormControl } from '../';
import DropdownSelect from '../DropdownSelect';
import Dropzone from 'react-dropzone';
import Image from '../ImageEditor/';
import { IDictionary } from '@mgutm-fcu/dictionary';
import FormLabel from '@material-ui/core/FormLabel';
import styles from './styles.css';
import { ISelectItem } from '../DropdownSelect';

export interface IDocDataForm {
	docType?: ISelectItem | null;
	docSubType?: ISelectItem | null;
	docNumber?: string;
	docSeries?: string;
	docIssued?: string;
	docDate?: string;
	docFile: File | null;
}

interface IDocDataProps {
	requireSeries?: boolean;
	hideDataFields?: boolean;
	required?: boolean;
	dictionaryTypes?: IDictionary[];
	dictionarySubTypes?: IDictionary[];
	title?: string;
	subTitle?: string;
	docTitle?: string;
	file: File | null;
	extraFields?: ReactElement<any> | null;
	defaultType?: ISelectItem;
	defaultSubType?: ISelectItem;
	selectDocType?: (type: ISelectItem) => void;
	selectDocSubType?: (subType: ISelectItem) => void;
	onChangeNumber?: (value: string) => void;
	onChangeSeries?: (value: string) => void;
	onChangeIssieBy?: (value: string) => void;
	onDownloadFile: (file: File | null) => void;
	onChangeDate?: (date: string) => void;
}

class DocDataForm extends React.PureComponent<IDocDataProps & { hideDataFields: boolean }> {
	public static defaultProps = {
		hideDataFields: false,
		selectDocType: (data: ISelectItem) => void 0,
		selectDocSubType: (data: ISelectItem) => void 0,
	};

	public removeImage = () => {
		this.props.onDownloadFile(null);
	};
	public render() {
		const isDataVisible = !!(
			(this.props.dictionaryTypes && this.props.title) ||
			(this.props.dictionarySubTypes && this.props.subTitle) ||
			!this.props.hideDataFields ||
			this.props.extraFields
		);
		return (
			<FormControl>
				<div className={styles.docDataForm}>
					{isDataVisible && (
						<div className={styles.dataContainer}>
							{this.props.dictionaryTypes && this.props.title && (
								<DropdownSelect
									required={true}
									defaultValue={this.props.defaultType}
									options={this.props.dictionaryTypes}
									placeholder={`Выберите ${this.props.title.toLowerCase()}`}
									onChangeSelect={this.props.selectDocType!}
									title={this.props.title}
								/>
							)}
							{this.props.dictionarySubTypes && this.props.subTitle && (
								<DropdownSelect
									required={true}
									defaultValue={this.props.defaultSubType}
									options={this.props.dictionarySubTypes}
									placeholder={`Выберите ${this.props.subTitle.toLowerCase()}`}
									onChangeSelect={this.props.selectDocSubType!}
									title={this.props.subTitle}
								/>
							)}
							{!this.props.hideDataFields && (
								<React.Fragment>
									<TextInput
										required={true}
										placeholder="Введите серию документа"
										label="Серия"
										onBlur={this.props.onChangeSeries}
									/>
									<TextInput
										required={true}
										placeholder="Введите номер документа"
										label="Номер"
										type="number"
										onBlur={this.props.onChangeNumber}
									/>
									<TextInput
										required={true}
										type="date"
										label="Дата выдачи документа"
										onBlur={this.props.onChangeDate}
									/>
									<TextInput
										required={true}
										placeholder="Введите кем выдан документ"
										label="Кем выдан документ"
										multiline={true}
										onBlur={this.props.onChangeIssieBy}
									/>
								</React.Fragment>
							)}
							{this.props.extraFields}
						</div>
					)}
					<div className={styles.documentContainer}>
						<Dropzone
							onDrop={acceptedFiles => {
								acceptedFiles.forEach(file => {
									const reader = new FileReader();

									reader.onload = e => {
										console.log(e.target);
										// @ts-ignore
										this.props.onDownloadFile(file);
									};
									reader.onabort = () => console.log('file reading was aborted');
									reader.onerror = () => console.log('file reading has failed');

									reader.readAsBinaryString(file);
								});
							}}>
							{({ getRootProps, getInputProps }) => {
								return (
									<div {...getRootProps()} className={styles.fileContainer}>
										{this.props.docTitle && (
											<div style={{ display: 'flex', flexDirection: 'row' }}>
												<FormLabel style={{ fontSize: '.875rem', marginRight: 2 }}>{this.props.docTitle}</FormLabel>
												<FormLabel style={{ color: 'red' }}>{'*'}</FormLabel>
											</div>
										)}
										{this.props.file ? (
											<React.Fragment>
												<Image title={this.props.file.name} file={this.props.file} removeImage={this.removeImage} />
											</React.Fragment>
										) : (
											<React.Fragment>
												<input {...getInputProps()} />
												<div className={styles.dropZone}>
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

export default DocDataForm;
