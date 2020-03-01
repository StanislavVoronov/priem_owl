import * as React from 'react';
import DocumentsFormView from './DocumentsFormView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	enrollDocumentsFormSelector,
	educationFormSelector,
	enrollIsForeignerSelector,
	getEducTypeDocDictionary,
	getGovernmentDictionary,
	getPrevEducTypesDocDictionary,
	IRootState,
	submitDocumentsForm,
} from '$store';
import { IDictionary, IDocumentsForm, IEducationForm } from '$common';
import { ITransaction } from '@black_bird/utils';

interface IStateToProps {
	form: IEducationForm;
	governmentDictionary: ITransaction<IDictionary>;
	preEducDictionary: ITransaction<IDictionary>;
	educationDictionary: ITransaction<IDictionary>;

	dictionaries: any;
	foreigner: boolean;
}
interface IDispatchToProps {
	submitDocumentsForm: (values: IDocumentsForm) => void;
}

interface IState {
	requiredDocuments: number[];
}
type IProps = IStateToProps & IDispatchToProps;
class DocumentsFormContainer extends React.Component<IProps, IState> {
	state = {
		requiredDocuments: [],
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

	submit = (values: IDocumentsForm) => {
		this.props.submitDocumentsForm(values);

	};
	render() {
		return null
		// return <DocumentsFormView requiredDocuments={this.state.requiredDocuments} {...this.props} submit={this.submit} />;
	}
}
const mapStateToProps: MapStateToProps<any, {}, IRootState> = state => {
	const prevEducDictionary = getPrevEducTypesDocDictionary(state);
	const educationDictionary = getEducTypeDocDictionary(state);
	const governmentDictionary = getGovernmentDictionary(state);

	const documents = enrollDocumentsFormSelector(state);
	const foreigner = enrollIsForeignerSelector(state);

	return { educationDictionary, governmentDictionary, prevEducDictionary, form: educationFormSelector, foreigner };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	submitDocumentsForm,
};
export default connect(mapStateToProps, mapDispatchToProps)(DocumentsFormContainer);
