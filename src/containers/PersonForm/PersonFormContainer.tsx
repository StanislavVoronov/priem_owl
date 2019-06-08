import EnrollPersonFormView from './PersonFormView';

import {
	addPersonPhoto,
	dictionaryStateSelector,
	IRootState,
	onChangeBirthPlace,
	onChangeCodeDepartment,
	onChangeGovernment,
	removePersonPhoto,
	updatePersonDocument,
	enrollPersonFormSelector,
	onChangeApplyPersonDataStatus,
} from '$store';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { IDocument, IEnrollPersonForm, ISelectItem } from '$common';

interface IStateToProps {
	data: IEnrollPersonForm;
	dictionaries: DictionaryState;
}
interface IDispatchToProps {
	addPersonPhoto: (file: File) => void;
	removePersonPhoto: () => void;
}

interface IOwnProps {
	onComplete: () => void;
}

type IProps = IStateToProps & IDispatchToProps & IOwnProps;

class PersonFormContainer extends React.Component<IProps> {
	submit = () => {};
	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.log('error', error);
		console.log('errorInfo', errorInfo);
	}

	render() {
		return <EnrollPersonFormView {...this.props} submit={this.submit} />;
	}
}

const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);

	const data = enrollPersonFormSelector(state);

	return { dictionaries, data };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = {
	addPersonPhoto,
	removePersonPhoto,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PersonFormContainer);
