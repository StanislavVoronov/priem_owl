import * as React from 'react';
import EducationFormView from './EducationFormView';
import { IDocument, IEnrollEducationForm, ISelectItem } from '$common';
import {
	dictionaryStateSelector,
	enrollEducationFormSelector,
	IRootState,
	toggleFirstHighEducationStatus,
	toggleHasEgeStatus,
	updateEducationDocument,
} from '$store';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { DictionaryState } from '@mgutm-fcu/dictionary';

interface IStateToProps extends IEnrollEducationForm {
	dictionaries: DictionaryState;
}
interface IOwnProps {
	submit: () => void;
}
interface IDispatchToProps {
	updateEducationDocument: (document: IDocument) => void;
	toggleHasEgeStatus: () => void;
	toggleFirstHighEducationStatus: () => void;
}
type IProps = IStateToProps & IDispatchToProps & IOwnProps;
class EducationFormContainer extends React.Component<IProps> {
	render() {
		return <EducationFormView {...this.props} />;
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);

	const { data } = enrollEducationFormSelector(state);

	return { ...data, dictionaries };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	updateEducationDocument,
	toggleHasEgeStatus,
	toggleFirstHighEducationStatus,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EducationFormContainer);
