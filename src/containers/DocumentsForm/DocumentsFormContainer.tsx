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

import { EDictionaryNameList, IDocumentsForm } from '$common';

interface IStateToProps extends IDocumentsForm {
	dictionaries: any;
	foreigner: boolean;
}
interface IDispatchToProps {
	submitDocumentsForm: (values: IDocumentsForm) => void;
}
interface IOwnProps {
	onComplete: () => void;
}
interface IState {
	requiredDocuments: number[];
}
type IProps = IStateToProps & IDispatchToProps & IOwnProps;
class DocumentsFormContainer extends React.Component<IProps, IState> {
	state = {
		requiredDocuments: [],
	};
	componentDidMount(): void {
		const dictionaryDocTypes = this.props.dictionaries[EDictionaryNameList.DocTypes];

		const needDocuments =
			dictionaryDocTypes && this.props.foreigner
				? dictionaryDocTypes.values.filter((item: any) => item.need_foreigner).map((item: any) => item.id)
				: [];
		this.setState({ requiredDocuments: [9, 10, ...needDocuments] });
	}

	submit = (values: IDocumentsForm) => {
		this.props.submitDocumentsForm(values);
		this.props.onComplete();
	};
	render() {
		return <DocumentsFormView requiredDocuments={this.state.requiredDocuments} {...this.props} submit={this.submit} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(DocumentsFormContainer);
