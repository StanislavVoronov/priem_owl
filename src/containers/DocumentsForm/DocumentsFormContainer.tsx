import * as React from 'react';
import DocumentsFormView from './DocumentsFormView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	dictionaryStateSelector,
	enrollDocumentsFormSelector,
	enrollIsForeignerSelector,
	IRootState,
	addDocument,
	removeDocument,
	updateDocument,
	selectCheatType,
} from '$store';
import { uploadDocList } from '$operations';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { IDocument, ISelectItem } from '$common';

interface IStateToProps {
	documents: IDocument[];
	dictionaries: DictionaryState;
	cheatType: ISelectItem | null;
	foreigner: boolean;
}
interface IDispatchToProps {
	updateDocument: (key: number, document: IDocument) => void;
	removeDocument: (key: number) => void;
	addDocument: () => void;
	selectCheatType: (value: ISelectItem) => void;
}
interface IOwnProps {
	submit: () => void;
}
type IProps = IStateToProps & IDispatchToProps & IOwnProps;
class DocumentsFormContainer extends React.Component<IProps> {
	render() {
		return <DocumentsFormView {...this.props} />;
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);
	const { data } = enrollDocumentsFormSelector(state);
	const foreigner = enrollIsForeignerSelector(state);

	return { dictionaries, documents: data.documents, cheatType: data.cheatType, foreigner };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = {
	updateDocument,
	removeDocument,
	addDocument,
	selectCheatType,
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(DocumentsFormContainer);
