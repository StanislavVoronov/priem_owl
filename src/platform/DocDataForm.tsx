import React, { ReactElement } from 'react';
import { TextInput, FormControl, Button } from './';
import { composeStyles, IDataChanged, ISelectItem, IDocDataForm, makeVerticalSpace } from '../common';
import DropdownSelect from './DropdownSelect';
import Dropzone, { DropzoneRenderArgs } from 'react-dropzone';
import Image from './ImageEditor';
import { IDictionary } from '@mgutm-fcu/dictionary';
interface IDocDataProps {
	requireSeries?: boolean;
	isNeedData?: boolean;
	dictionaryTypes?: IDictionary[];
	dictionarySubTypes?: IDictionary[];
	title?: string;
	subTitle?: string;
	file: string | File | null;
	extraFields?: ReactElement<any>;
	defaultType?: ISelectItem;
	defaultSubType?: ISelectItem;
	selectDocType?: (type: ISelectItem) => void;
	selectDocSubType?: (subType: ISelectItem) => void;
	onChangeNumber: (value: string) => void;
	onChangeSeries: (value: string) => void;
	onChangeIssieBy: (value: string) => void;
	onDownloadFile: (file: string | File | null) => void;
	onChangeDate: (date: string) => void;
}

const styles = {
	dropZone: {
		padding: 20,
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
class DocDataForm extends React.PureComponent<IDocDataProps> {
	static defaultProps = {
		selectDocType: (data: ISelectItem) => void 0,
		selectDocSubType: (data: ISelectItem) => void 0,
	};

	renderDocImage = (data: DropzoneRenderArgs) => {
		const file = data.draggedFiles[0];
		return <Image source={file} />;
	};
	removeImage = () => {
		this.props.onDownloadFile(null);
	};
	render() {
		return (
			<FormControl>
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
				<Dropzone
					onDrop={acceptedFiles => {
						acceptedFiles.forEach(file => {
							const reader = new FileReader();
							reader.onload = () => {
								this.props.onDownloadFile(file);
							};
							reader.onabort = () => console.log('file reading was aborted');
							reader.onerror = () => console.log('file reading has failed');

							reader.readAsBinaryString(file);
						});
					}}>
					{({ getRootProps, getInputProps, isDragActive }) => {
						return (
							<div {...getRootProps()} style={makeVerticalSpace('small')}>
								{this.props.file ? (
									<React.Fragment>
										<Image source={this.props.file} removeImage={this.removeImage} />
									</React.Fragment>
								) : (
									<React.Fragment>
										<input {...getInputProps()} />
										<div style={composeStyles(styles.dropZone)}>
											Добавить новый документ или перетащите в отмеченную область
										</div>
									</React.Fragment>
								)}
							</div>
						);
					}}
				</Dropzone>
				{this.props.isNeedData !== false && (
					<React.Fragment>
						<TextInput placeholder="Введите серию документа" label="Серия" onBlur={this.props.onChangeSeries} />
						<TextInput
							required
							placeholder="Введите номер документа"
							label="Номер"
							type="number"
							onBlur={this.props.onChangeNumber}
						/>
						<TextInput required type="date" label="Дата выдачи документа" onBlur={this.props.onChangeDate} />
						<TextInput
							required
							placeholder="Введите кем выдан документ"
							label="Кем выдан документ"
							multiline
							onBlur={this.props.onChangeIssieBy}
						/>
					</React.Fragment>
				)}
				{/*{props.extraFields}*/}

				{/*<Dropzone*/}
				{/*onDrop={acceptedFiles => {*/}
				{/*acceptedFiles.forEach(file => {*/}
				{/*const reader = new FileReader();*/}
				{/*reader.onload = () => {*/}
				{/*const fileAsBinaryString = reader.result;*/}
				{/*console.log('file', file);*/}
				{/*props.onChangeData('docFile')({*/}
				{/*name: file.name,*/}
				{/*size: file.size,*/}
				{/*type: file.type,*/}
				{/*binary: fileAsBinaryString,*/}
				{/*});*/}
				{/*};*/}
				{/*reader.onabort = () => console.log('file reading was aborted');*/}
				{/*reader.onerror = () => console.log('file reading has failed');*/}

				{/*reader.readAsBinaryString(file);*/}
				{/*});*/}
				{/*}}>*/}
				{/*{({getRootProps, getInputProps, isDragActive}) => {*/}
				{/*return (*/}

				{/*style={composeStyles(styles.dropZone, styles.fileInDropZone)}>{props.docFile.name}</div>*/}
				{/*)}*/}
				{/*{isDragActive ? (*/}
				{/*<div style={composeStyles(styles.dropZone, styles.activeDropZone)}>*/}
				{/*{props.docFile ? 'Заменить документ' : 'Добавить документ...'}*/}
				{/*</div>*/}
				{/*) : (*/}
				{/*!props.docFile && (*/}
				{/*<div style={composeStyles(styles.dropZone)}>*/}
				{/*Добавить новый документ или перетащите в отмеченную область*/}
				{/*</div>*/}
				{/*)*/}
				{/*)}*/}
				{/*</div>*/}
				{/*);*/}
				{/*}}*/}
				{/*</Dropzone>*/}
			</FormControl>
		);
	}
}

export default DocDataForm;
