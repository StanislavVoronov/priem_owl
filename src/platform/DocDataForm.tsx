import React, { ReactElement } from 'react';
import { TextInput, FormControl } from './';
import { composeStyles, GlobalStyles, ISelectItem } from '../common';
import DropdownSelect from './DropdownSelect';
import Dropzone, { DropzoneRenderArgs } from 'react-dropzone';
import Image from './ImageEditor';
import { IDictionary } from '@mgutm-fcu/dictionary';
import FormLabel from '@material-ui/core/FormLabel';
import { IDocFile } from '../containers/Enroll';

interface IUploadFile {
	lastModified: Date;
	lastModifiedDate: Date;
	name: string;
	size: number;
	type: string;
	binary: string;
}

export interface IDocDataForm {
	docType?: ISelectItem | null;
	docSubType?: ISelectItem | null;
	docNumber?: string;
	docSeries?: string;
	docIssued?: string;
	docDate?: string;
	docFile: IUploadFile | null;
	hideDataFields?: boolean;
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
	file: IDocFile | null;
	extraFields?: ReactElement<any> | null;
	defaultType?: ISelectItem;
	defaultSubType?: ISelectItem;
	selectDocType?: (type: ISelectItem) => void;
	selectDocSubType?: (subType: ISelectItem) => void;
	onChangeNumber?: (value: string) => void;
	onChangeSeries?: (value: string) => void;
	onChangeIssieBy?: (value: string) => void;
	onDownloadFile: (file: IDocFile | null) => void;
	onChangeDate?: (date: string) => void;
}

const styles = {
	dropZone: {
		padding: 20,
		display: 'flex',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		borderColor: '#388e3c',
		borderStyle: 'solid',
		borderWidth: 3,
		flexWrap: 'wrap',
	},
	activeDropZone: { borderColor: 'red' },
	fileInDropZone: { borderColor: '#3f51b5', fontWeight: 'bold' },
	label: {
		fontSize: '0.75em',
	},
};
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
			!this.props.hideDataFields
		);
		return (
			<FormControl>
				<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
					{isDataVisible && (
						<div style={{ display: 'flex', paddingRight: 40, width: '50%', flexDirection: 'column' }}>
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
									<TextInput placeholder="Введите серию документа" label="Серия" onBlur={this.props.onChangeSeries} />
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
					<div style={{ display: 'flex', width: '40%', flexDirection: 'column' }}>
						<Dropzone
							onDrop={acceptedFiles => {
								acceptedFiles.forEach(file => {
									const reader = new FileReader();

									reader.onload = () => {
										this.props.onDownloadFile({ source: file, blob: reader.result });
									};
									reader.onabort = () => console.log('file reading was aborted');
									reader.onerror = () => console.log('file reading has failed');

									reader.readAsBinaryString(file);
								});
							}}>
							{({ getRootProps, getInputProps }) => {
								return (
									<div
										{...getRootProps()}
										style={{
											display: 'flex',
											flexDirection: 'column',
											marginTop: 12,
											height: '100%',
											marginBottom: 10,
										}}>
										{this.props.docTitle && (
											<FormLabel style={{ fontSize: '0.75em' }}>
												{this.props.docTitle}
												{' *'}
											</FormLabel>
										)}
										{this.props.file ? (
											<React.Fragment>
												<Image file={this.props.file} removeImage={this.removeImage} />
											</React.Fragment>
										) : (
											<React.Fragment>
												<input {...getInputProps()} />
												<div style={composeStyles(styles.dropZone)}>
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
