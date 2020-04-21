import React from 'react';
import { IDocument, IDocumentsForm, IDictionary, validateDocument, IDocType } from '$common';
import { always, cond, equals, ITransaction, T, propEq } from '@black_bird/utils';
import { DocumentItem } from './components';
import { Button, Row, Wrapper } from '@black_bird/components';
import classes from './styles.module.css';
import { List, ListSubheader } from '$components';
const getSubTypeDictionary = cond([
	[equals(1), (key, personDic) => personDic.result],
	[equals(2), (key, personDic, educationDic) => educationDic.result],
	[T, always([])],
]);

interface IProps extends IDocumentsForm {
	docTypesDictionary: ITransaction<IDictionary[]>;
	governmentDictionary: ITransaction<IDictionary[]>;
	subTypesDocDictionary: ITransaction<IDictionary[]>;
	addDoc: () => void;
	deleteDoc: (index: number) => void;
	onToggleItem: (index: number) => void;
	onChangeData: (data: IDocument, index: number) => void;
	expendList: number[];
	onSubmit: () => void;
	requireDocs: IDocType[];
}

const DocumentsFormView = (props: IProps) => {
	const {
		documents,
		addDoc,
		subTypesDocDictionary,
		docTypesDictionary,
		expendList,
		deleteDoc,
		onToggleItem,
		onChangeData,
		governmentDictionary,
		onSubmit,
		requireDocs,
	} = props;

	const addButtonDisabled = documents.map(validateDocument).includes(false);

	const nextButtonDisabled =
		requireDocs.filter((item) => !documents.some((doc) => (doc.type && doc.type.id) === item.id)).length > 0;

	return (
		<>
			<List component="div" subheader={<div className={classes.needDocTitle}>Список необходимых документов</div>}>
				<ul className={classes.list}>
					<li className={classes.tick}>Документ, удостоверающий личность</li>
					<li className={classes.tick}>Документ о регистрации места жительства</li>
					<li className={classes.tick}>Документ о предыдущем образовании</li>
					{requireDocs.map((item) => (
						<li
							className={
								documents.some((doc) => validateDocument(doc) && doc.type && doc.type.id === item.id)
									? classes.tick
									: classes.cross
							}>
							{item.name}
						</li>
					))}
				</ul>
			</List>

			{documents.map((doc: IDocument, index: number) => {
				const { type, subType } = doc;

				const filteredSubTypesDocDictionary = {
					...subTypesDocDictionary,
					result: subTypesDocDictionary.result.filter((item) => item.type === type?.id),
				};

				return (
					<DocumentItem
						key={`${index}`}
						governmentDictionary={governmentDictionary}
						docTypesDictionary={docTypesDictionary}
						subDocTypesDictionary={filteredSubTypesDocDictionary}
						expanded={expendList.some(equals(index))}
						onChange={onChangeData}
						index={index}
						onToggle={onToggleItem}
						deleteDoc={deleteDoc}
						document={doc}
					/>
				);
			})}
			<Wrapper margin="huge" className={classes.buttonWrapper}>
				<Button margin="huge" disabled={addButtonDisabled} classes={{ root: classes.addDoc }} onClick={addDoc}>
					Добавить новый документ
				</Button>
				<Button disabled={nextButtonDisabled} margin="huge" onClick={onSubmit}>
					Последний шаг
				</Button>
			</Wrapper>
		</>
	);
};

export default DocumentsFormView;
