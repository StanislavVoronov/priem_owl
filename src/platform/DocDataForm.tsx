import React, { ReactElement } from 'react';
import { TextInput, FormControl } from './';
import { composeStyles, IDataChanged, ISelectItem, makeSpace, IDocDataForm } from '../common';
import DropdownSelect from './DropdownSelect';
import Dropzone from 'react-dropzone';
import { IDictionary } from '@mgutm-fcu/dictionary';
import FormLabel from '@material-ui/core/FormLabel';
interface IDocDataProps extends IDataChanged, IDocDataForm {
	requireSeries?: boolean;
	isNeedData?: boolean;
	dictionaryTypes?: IDictionary[];
	dictionarySubTypes?: IDictionary[];
	title?: string;
	subTitle?: string;
	extraFields?: ReactElement<any>;
	defaultType?: ISelectItem;
	defaultSubType?: ISelectItem;
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
const DocDataForm = (props: IDocDataProps) => {
	return (
		<FormControl>
			{props.dictionaryTypes && props.title && (
				<DropdownSelect
					required={true}
					defaultValue={props.defaultType}
					options={props.dictionaryTypes}
					placeholder={`Выберите ${props.title.toLowerCase()}`}
					onChangeSelect={props.onChangeData('docType')}
					title={props.title}
				/>
			)}
			{props.dictionarySubTypes && props.subTitle && (
				<DropdownSelect
					required={true}
					defaultValue={props.defaultSubType}
					options={props.dictionarySubTypes}
					placeholder={`Выберите ${props.subTitle.toLowerCase()}`}
					onChangeSelect={props.onChangeData('docSubType')}
					title={props.subTitle}
				/>
			)}
			{props.isNeedData !== false && (
				<React.Fragment>
					<TextInput
						required={props.requireSeries}
						placeholder="Введите серию документа"
						label="Серия"
						onBlur={props.onChangeData('docSeries')}
					/>
					<TextInput
						required
						placeholder="Введите номер документа"
						label="Номер"
						type="number"
						onBlur={props.onChangeData('doсNumber')}
					/>
					<TextInput required type="date" label="Дата выдачи документа" onBlur={props.onChangeData('docDate')} />
					<TextInput
						required
						placeholder="Введите кем выдан документ"
						label="Кем выдан документ"
						multiline
						onBlur={props.onChangeData('docIssued')}
					/>
				</React.Fragment>
			)}
			{props.extraFields}

			<Dropzone
				onDrop={acceptedFiles => {
					acceptedFiles.forEach(file => {
						const reader = new FileReader();
						reader.onload = () => {
							const fileAsBinaryString = reader.result;
							console.log('file', file);
							props.onChangeData('docFile')({
								name: file.name,
								size: file.size,
								type: file.type,
								binary: fileAsBinaryString,
							});
						};
						reader.onabort = () => console.log('file reading was aborted');
						reader.onerror = () => console.log('file reading has failed');

						reader.readAsBinaryString(file);
					});
				}}>
				{({ getRootProps, getInputProps, isDragActive }) => {
					return (
						<div {...getRootProps()} style={makeSpace('v-middle')}>
							<input {...getInputProps()} />
							<FormLabel style={styles.label}>{'Файл документа *'}</FormLabel>
							{props.docFile && (
								<div style={composeStyles(styles.dropZone, styles.fileInDropZone)}>{props.docFile.name}</div>
							)}
							{isDragActive ? (
								<div style={composeStyles(styles.dropZone, styles.activeDropZone)}>
									{props.docFile ? 'Заменить документ' : 'Добавить документ...'}
								</div>
							) : (
								!props.docFile && (
									<div style={composeStyles(styles.dropZone)}>
										Добавить новый документ или перетащите в отмеченную область
									</div>
								)
							)}
						</div>
					);
				}}
			</Dropzone>
		</FormControl>
	);
};

export default DocDataForm;
