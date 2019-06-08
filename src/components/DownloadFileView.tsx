import styles from './DocumentForm/styles';
import ImageEditor from './ImageEditor';
import { Field, FieldProps, FormikProps } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';
import { FormLabel } from '@material-ui/core';
import { noop } from '$common';
interface IProps {
	name: string;
	title: string;
	validate: (file: File) => string | void;
}
class DownloadFileView extends React.Component<IProps> {
	static defaultProps = {
		validate: noop,
		title: '',
	};
	onDownload = (form: FormikProps<File>) => (acceptedFiles: File[]) => {
		acceptedFiles.forEach(file => {
			const reader = new FileReader();

			reader.onload = e => {
				form.setFieldValue(this.props.name, file);
			};
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.readAsBinaryString(file);
		});
	};
	onDelete = (form: FormikProps<File>) => () => {
		form.setFieldValue(this.props.name, null);
	};

	renderDropZone = (props: FieldProps) => {
		const { field, form } = props;
		return (
			<Dropzone onDrop={this.onDownload(form)}>
				{props => (
					<div {...props.getRootProps()} style={styles.fileContainer}>
						{this.props.title && (
							<div style={{ display: 'flex', flexDirection: 'row' }}>
								<FormLabel style={{ fontSize: '.875rem', marginRight: 2 }}>{this.props.title}</FormLabel>
								<FormLabel style={{ color: 'red' }}>{'*'}</FormLabel>
							</div>
						)}
						{field.value ? (
							<ImageEditor title={field.value.name} file={field.value} removeImage={this.onDelete(form)} />
						) : (
							<React.Fragment>
								<input {...props.getInputProps()} name={this.props.name} />
								<div style={styles.dropZone}>Нажмите, чтобы добавить файл или перетащите файл в отмеченную область</div>
							</React.Fragment>
						)}
					</div>
				)}
			</Dropzone>
		);
	};
	render() {
		return (
			<Field
				validateOnChange={true}
				validate={this.props.validate}
				name={this.props.name}
				render={this.renderDropZone}
			/>
		);
	}
}

export default DownloadFileView;
