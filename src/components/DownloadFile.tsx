import styles from './DocumentForm/styles';
import ImageEditor from './ImageEditor';
import { Field, FieldProps, FormikProps } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';
import { FormLabel } from '@material-ui/core';
import { noop, prop, get } from '$common';
import { H2 } from '$components';
interface IProps {
	name: string;
	title: string;
}
class DownloadFile extends React.Component<IProps> {
	static defaultProps = {
		name: '',
		title: '',
	};
	onDownload = (form: FormikProps<File>, field: any) => (acceptedFiles: File[]) => {
		acceptedFiles.forEach(file => {
			const reader = new FileReader();

			reader.onload = e => {
				form.setFieldValue(field.name, file);
			};
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.readAsBinaryString(file);
		});
	};
	onDelete = (form: FormikProps<File>) => () => {
		form.setFieldValue(this.props.name, null);
	};

	renderDropZone = (formikProps: FieldProps) => {
		const { field, form } = formikProps;
		const error = get(form.errors, this.props.name);

		return (
			<Dropzone onDrop={this.onDownload(form, field)}>
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
								<div style={styles.dropZone}>
									<span>Нажмите, чтобы добавить файл или перетащите файл в отмеченную область</span>
									{error && <H2 color="red">{error}</H2>}
								</div>
							</React.Fragment>
						)}
					</div>
				)}
			</Dropzone>
		);
	};
	render() {
		return <Field name={this.props.name} render={this.renderDropZone} />;
	}
}

export default DownloadFile;
