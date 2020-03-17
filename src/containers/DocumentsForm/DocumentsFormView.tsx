import React from 'react';
import { IDocument, IDocumentsForm, IDictionary, validateDocument } from '$common';
import { always, cond, equals, ITransaction, T, propEq } from '@black_bird/utils';
import { DocumentItem } from './components';
import { Button } from '@black_bird/components';
import classes from './styles.module.css';
import { List, ListSubheader } from '$components';
const getSubTypeDictionary = cond([
	[equals(1), (key, personDic) => personDic.result],
	[equals(2), (key, personDic, educationDic) => educationDic.result],
	[T, always([])],
]);

interface IProps extends IDocumentsForm {
	docTypesDictionary: ITransaction<IDictionary>;
	governmentDictionary: ITransaction<IDictionary>;
	educationDictionary: ITransaction<IDictionary>;
	personDocDictionary: ITransaction<IDictionary>;
	addDoc: () => void;
	deleteDoc: (index: number) => void;
	onToggleItem: (index: number) => void;
	onChangeData: (data: IDocument, index: number) => void;
	expendList: number[];
	onSubmit: () => void;
	requireDocs: IDocument[];
}

const DocumentsFormView = (props: IProps) => {
	const {
		documents,
		addDoc,
		personDocDictionary,
		expendList,
		educationDictionary,
		deleteDoc,
		onToggleItem,
		onChangeData,
		governmentDictionary,
		onSubmit,
		requireDocs,
	} = props;

	const addButtonDisabled = documents.map(validateDocument).includes(false);

	const nextButtonDisabled = false; // requireDocs.filter(item => !documents.some(doc => (doc.type && doc.type.id) === item.id)).length > 0;

	return (
		<>
			<List component="div" subheader={<div className={classes.needDocTitle}>Список необходимых документов</div>}>
				<ul className={classes.list}>
					<li className={classes.tick}>Документ, удостоверающий личность</li>
					<li className={classes.tick}>Документ о регистрации места жительства</li>
					<li className={classes.tick}>Документ о предыдущем образовании</li>
					{requireDocs.map(item => (
						<li className={documents.some(doc => doc.type && doc.type.id === item.id) ? classes.tick : classes.cross}>
							{item.name}
						</li>
					))}
				</ul>
			</List>
			{documents.map((doc: IDocument, index: number) => {
				const { type, subType } = doc;

				const subTypesDictionary = getSubTypeDictionary(type && type.id, personDocDictionary, educationDictionary);

				return (
					<DocumentItem
						key={`${index}`}
						governmentDictionary={governmentDictionary.result}
						docTypesDictionary={props.docTypesDictionary.result}
						subDocTypesDictionary={subTypesDictionary}
						expanded={expendList.some(equals(index))}
						onChange={onChangeData}
						index={index}
						onToggle={onToggleItem}
						deleteDoc={deleteDoc}
						document={doc}
					/>
				);
			})}
			<Button margin="huge" disabled={addButtonDisabled} classes={{ root: classes.addDoc }} onClick={addDoc}>
				Добавить новый документ
			</Button>
			<Button disabled={nextButtonDisabled} margin="huge" onClick={onSubmit}>
				Далее
			</Button>
		</>
	);
};

export default DocumentsFormView;
