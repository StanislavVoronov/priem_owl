import * as React from 'react';
import DocumentsFormView from './DocumentsFormView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	dictionaryStateSelector,
	enrollDocumentsFormSelector,
	enrollIsForeignerSelector,
	IRootState,
	submitDocumentsForm,
} from '$store';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { IDocument, IDocumentsForm } from '$common';

interface IStateToProps extends IDocumentsForm {
	dictionaries: DictionaryState;
	foreigner: boolean;
}
interface IDispatchToProps {
	submitDocumentsForm: (values: IDocumentsForm) => void;
}
interface IOwnProps {
	onComplete: () => void;
}
type IProps = IStateToProps & IDispatchToProps & IOwnProps;
class DocumentsFormContainer extends React.Component<IProps> {
	submit = (values: IDocumentsForm) => {
		this.props.submitDocumentsForm(values);
		this.props.onComplete();
	};
	render() {
		return <DocumentsFormView {...this.props} submit={this.submit} />;
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);
	const documents = enrollDocumentsFormSelector(state);
	const foreigner = enrollIsForeignerSelector(state);

	return { dictionaries, ...documents, foreigner };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = {
	submitDocumentsForm,
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(DocumentsFormContainer);
