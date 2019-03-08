import React, { ReactElement } from 'react';
import { TextInput, FormControl, Button } from './';
import { composeStyles, IDataChanged, ISelectItem, IDocDataForm, makeVerticalSpace } from '../common';
import DropdownSelect from './DropdownSelect';
import Dropzone, { DropzoneRenderArgs } from 'react-dropzone';
import Image from './ImageEditor';
import { IDictionary } from '@mgutm-fcu/dictionary';
import FormLabel from '@material-ui/core/FormLabel';
interface IDocDataProps {
	requireSeries?: boolean;
	hideDataFields?: boolean;
	required?: boolean;
	dictionaryTypes?: IDictionary[];
	dictionarySubTypes?: IDictionary[];
	title?: string;
	subTitle?: string;
	docTitle?: string;
	file: string | File | null;
	extraFields?: ReactElement<any>;
	defaultType?: ISelectItem;
	defaultSubType?: ISelectItem;
	selectDocType?: (type: ISelectItem) => void;
	selectDocSubType?: (subType: ISelectItem) => void;
	onChangeNumber?: (value: string) => void;
	onChangeSeries?: (value: string) => void;
	onChangeIssieBy?: (value: string) => void;
	onDownloadFile: (file: string | File | null) => void;
	onChangeDate?: (date: string) => void;
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
	public static defaultProps = {
		required: true,
		selectDocType: (data: ISelectItem) => void 0,
		selectDocSubType: (data: ISelectItem) => void 0,
	};

	public renderDocImage = (data: DropzoneRenderArgs) => {
		const file = data.draggedFiles[0];
		return <Image source={file} />;
	};
	public removeImage = () => {
		this.props.onDownloadFile(null);
	};
	public render() {
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
							<div {...getRootProps()} style={{ marginTop: 10, marginBottom: 10 }}>
								{this.props.docTitle && (
									<FormLabel style={{ fontSize: '0.75em' }}>
										{this.props.docTitle}
										{this.props.required ? ' *' : ''}
									</FormLabel>
								)}
								{this.props.file ? (
									<React.Fragment>
										<Image source={this.props.file} removeImage={this.removeImage} />
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
						<TextInput required={true} type="date" label="Дата выдачи документа" onBlur={this.props.onChangeDate} />
						<TextInput
							required={true}
							placeholder="Введите кем выдан документ"
							label="Кем выдан документ"
							multiline={true}
							onBlur={this.props.onChangeIssieBy}
						/>
					</React.Fragment>
				)}
			</FormControl>
		);
	}
}

export default DocDataForm;
