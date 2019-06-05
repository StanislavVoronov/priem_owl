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
	updatePersonDocument: (data: IDocument) => void;
	onChangeBirthPlace: (event: ChangeEvent<HTMLInputElement>) => void;
	onChangeGovernment: (value: ISelectItem) => void;
	addPersonPhoto: (file: File) => void;
	onChangeCodeDepartment: (event: ChangeEvent<HTMLInputElement>) => void;
	removePersonPhoto: () => void;
	onChangeApplyPersonDataStatus: () => void;
}

interface IOwnProps {
	submit: () => void;
}

type IProps = IStateToProps & IDispatchToProps & IOwnProps;

class PersonFormContainer extends React.Component<IProps> {
	submit = () => {
		this.props.submit();
	};
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

	const { data, statusValidation } = enrollPersonFormSelector(state);

	return { dictionaries, data, statusValidation };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = {
	onChangeBirthPlace,
	onChangeGovernment,
	updatePersonDocument,
	onChangeCodeDepartment,
	addPersonPhoto,
	removePersonPhoto,
	onChangeApplyPersonDataStatus,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PersonFormContainer);
