import styles from './DocumentForm/styles';
import ImageEditor from './ImageEditor';

import React from 'react';
import Dropzone from 'react-dropzone';
import { FormLabel, InputLabel } from '@material-ui/core';
import { IFormField } from '@black_bird/components';
import { isNotVoid } from '@black_bird/utils';

interface IProps {
	name: string;
	title: string;
	file: any | null;
	onChange: (file: IFormField) => void;
	error?: any;
}
const FILE_FORMATS = ['image/jpeg', 'image/jpg'];
class DownloadFile extends React.Component<IProps> {
	static defaultProps = {
		name: '',
		title: '',
	};
	onDownload = (acceptedFiles: File[]) => {
		acceptedFiles.forEach(file => {
			const reader = new FileReader();
			const size = file.size / 1024 / 1024;
			if (!FILE_FORMATS.includes(file.type)) {
				const message = `Формат файла не поддерживаете. Добавьте файл формата: jpg или jpeg`;
				alert(message);

				return;
			}
			if (size >= 5) {
				alert('Файл не должен превышать размер 5 Мб');

				return;
			}

			reader.onload = () => {
				this.props.onChange({ name: this.props.name, value: file });
			};
			reader.onabort = () => alert('file reading was aborted');
			reader.onerror = () => alert('file reading has failed');
			reader.readAsBinaryString(file);
		});
	};
	onDelete = () => {
		this.props.onChange({ name: this.props.name, value: null });
	};

	render() {
		const { file } = this.props;

		return (
			<Dropzone onDrop={this.onDownload}>
				{props => (
					<div {...props.getRootProps()} style={styles.fileContainer}>
						<input {...props.getInputProps()} name={this.props.name} />

						{this.props.title && (
							<div style={{ display: 'flex', flexDirection: 'row' }}>
								<FormLabel style={{ fontSize: '.875rem', marginRight: 2 }}>{this.props.title}</FormLabel>
								<FormLabel style={{ color: 'red' }}>{'*'}</FormLabel>
							</div>
						)}
						{isNotVoid(file) ? (
							<ImageEditor title={file.name} file={file} removeImage={this.onDelete} />
						) : (
							<React.Fragment>
								<div style={styles.dropZone}>
									<span>Нажмите, чтобы добавить файл или перетащите файл в отмеченную область</span>
									<span>(размер: &#60; 5 Мб; формат: jpg, jpeg)</span>

									{this.props.error && (
										<InputLabel style={{ color: 'red', marginTop: 4, fontSize: '0.875rem' }}>
											{this.props.error}
										</InputLabel>
									)}
								</div>
							</React.Fragment>
						)}
					</div>
				)}
			</Dropzone>
		);
	}
}

export default DownloadFile;
