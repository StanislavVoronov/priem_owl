import * as React from 'react';
import DocumentsFormView from './DocumentsFormView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	documentsFormSelector,
	isForeignerSelector,
	getEducTypeDocDictionary,
	getGovernmentDictionary,
	getDocTypesDictionary,
	IRootState,
	getPersonTypesDocDictionary,
	submitDocumentsFormAction,
	getNeedDocuments,
	getSubTypesDocDictionary,
} from '$store';
import { defaultDocument, IDictionary, IDocType, IDocument } from '$common';
import { ITransaction } from '@black_bird/utils';

interface IStateToProps {
	docTypesDictionary: ITransaction<IDictionary[]>;
	governmentDictionary: ITransaction<IDictionary[]>;
	subTypesDocDictionary: ITransaction<IDictionary[]>;
	requireDocs: IDocType[];
	documents: IDocument[];
}

interface IDispatchProps {
	onSubmit: (documents: IDocument[]) => void;
}
type IProps = IStateToProps & IDispatchProps;

interface IState {
	documents: IDocument[];
	expendList: number[];
}

class DocumentsFormContainer extends React.Component<IProps, IState> {
	state = {
		documents: this.props.documents,
		expendList: [0],
	};
	componentDidMount(): void {
		// const dictionaryDocTypes =[]
		//
		// const needDocuments =
		// 	dictionaryDocTypes && this.props.foreigner
		// 		? dictionaryDocTypes.values.filter((item: any) => item.need_foreigner).map((item: any) => item.id)
		// 		: [];
		// this.setState({ requiredDocuments: [9, 10, ...needDocuments] });
	}

	onChangeData = (data: IDocument, index: number) => {
		this.setState((state) => ({
			...state,
			documents: state.documents.map((item, key) => {
				if (key === index) {
					return data;
				}

				return item;
			}),
		}));
	};
	deleteDoc = (index: number) => {
		this.setState((state) => ({ ...state, documents: state.documents.filter((item, key) => key !== index) }));
	};
	onToggleItem = (index: number) => {
		const { expendList } = this.state;
		const exists = expendList.some((item, key) => key === index);

		const newExpendedList = exists ? expendList.filter((item, key) => key !== index) : [...expendList, index];

		this.setState((state) => ({ ...state, expendList: newExpendedList }));
	};
	onSubmit = () => {
		this.props.onSubmit(this.state.documents);
	};

	addDoc = () => {
		this.setState((state) => ({
			...state,
			expendList: [...state.expendList, state.documents.length],
			documents: [...state.documents, defaultDocument],
		}));
	};

	render() {
		return (
			<DocumentsFormView
				{...this.props}
				onToggleItem={this.onToggleItem}
				onChangeData={this.onChangeData}
				expendList={this.state.expendList}
				deleteDoc={this.deleteDoc}
				addDoc={this.addDoc}
				onSubmit={this.onSubmit}
				documents={this.state.documents}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = (state) => {
	const governmentDictionary = getGovernmentDictionary(state);
	const docTypesDictionary = getDocTypesDictionary(state);
	const requireDocs = getNeedDocuments(state);
	const form = documentsFormSelector(state);
	const subTypesDocDictionary = getSubTypesDocDictionary(state);

	return {
		subTypesDocDictionary,
		docTypesDictionary,
		governmentDictionary,
		documents: form.documents,
		requireDocs,
	};
};
const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = {
	onSubmit: submitDocumentsFormAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsFormContainer);
