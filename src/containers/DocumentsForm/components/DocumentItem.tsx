import { DocumentForm, ExpandMoreIcon, DeleteIcon, ExpansionPanel, ExpandLessIcon } from '$components';
import classes from './DocumentItem.module.css';
import classNames from 'classnames';
import React from 'react';
import { IDictionary, IDocument, isEmpty } from '$common';
import { ITransaction } from '@black_bird/utils';
import { IFormField, TextInput } from '@black_bird/components';
import { PanelDetails } from './styled';

interface IProps {
	onChange: (data: IDocument, index: number) => void;
	document: IDocument;
	index: number;
	expanded: boolean;
	onToggle: (index: number) => void;
	deleteDoc: (index: number) => void;
	governmentDictionary: ITransaction<IDictionary[]>;
	subDocTypesDictionary: ITransaction<IDictionary[]>;
	docTypesDictionary: ITransaction<IDictionary[]>;
}

const DocumentItem = (props: IProps) => {
	const { onChange, index, deleteDoc, expanded, subDocTypesDictionary, onToggle, document, docTypesDictionary } = props;
	const onChangeData = (data: IFormField) => {
		onChange(data.value, index);
	};
	const onDeleteDoc = () => {
		deleteDoc(index);
	};
	const onTogglePanel = () => {
		onToggle(index);
	};

	const onChangeDepartment = (data: IFormField) => {
		const newDoc = {
			...document,
			[data.name]: data.value,
		};

		onChange(newDoc, index);
	};

	const { type, subType } = document;

	return (
		<ExpansionPanel
			expanded={expanded}
			className={classes.wrapper}
			classes={{ root: classes.expansionPanel, expanded: classes.panelExpanded }}>
			<div
				className={classNames(classes.header, { [classes.openPanel]: expanded }, { [classes.closedPanel]: !expanded })}>
				<b>
					{`${index + 1}. `} {type ? type.name : 'Новый документ'}
				</b>
				{expanded ? (
					<ExpandLessIcon
						titleAccess="Свернуть"
						className={classes.expansionIcon}
						fontSize="small"
						onClick={onTogglePanel}
					/>
				) : (
					<ExpandMoreIcon
						titleAccess="Развернуть"
						className={classes.expansionIcon}
						fontSize="small"
						onClick={onTogglePanel}
					/>
				)}
				<DeleteIcon
					fontSize="small"
					onClick={onDeleteDoc}
					titleAccess="Удалить документ"
					color="error"
					className={classes.deleteIcon}
				/>
			</div>
			<PanelDetails className={classes.panelDetails}>
				<DocumentForm
					name="document"
					onChange={onChangeData}
					document={document}
					fileTitle="Файл документа"
					title="Тип документа"
					dictionaryTypes={docTypesDictionary}
					subTitle={isEmpty(subDocTypesDictionary.result) ? undefined : 'Название документа'}
					dictionarySubTypes={subDocTypesDictionary}
					endFields={
						<React.Fragment>
							{type && type.id === 1 && subType && subType.id === 1 ? (
								<TextInput
									name="codeDepartment"
									onChange={onChangeDepartment}
									label="Код подразделения"
									placeholder={'Введите код подразделения'}
								/>
							) : null}
						</React.Fragment>
					}
				/>
			</PanelDetails>
		</ExpansionPanel>
	);
};

export default DocumentItem;
