import React, { ChangeEvent } from 'react';
import EnrollContactsFormView from './ContactsFormView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { createVerificationCode } from '$operations';
import {
	dictionaryStateSelector,
	enrollContactsFormSelector,
	IRootState,
	selectMobileGovernment,
	toggleNeedDormitoryStatus,
	toggleLiveAddressStatus,
	updateContactsForm,
	updateRegDocument,
} from '$store';
import { IDocument, IEnrollContactsForm, ISelectItem } from '$common';
import { DictionaryState } from '@mgutm-fcu/dictionary';

interface IStateToProps extends IEnrollContactsForm {
	dictionaries: DictionaryState;
}
interface IDispatchToProps {
	updateContactsForm: (event: ChangeEvent<HTMLInputElement>) => void;
	updateRegDocument: (document: IDocument) => void;
	toggleNeedDormitoryStatus: () => void;
	toggleLiveAddressStatus: () => void;
	selectMobileGovernment: (item: ISelectItem) => void;
	submit: () => void;
}
interface IOwnProps {
	submit: () => void;
}
type IProps = IDispatchToProps & IStateToProps & IOwnProps;

class ContactsFormContainer extends React.Component<IProps> {
	render() {
		return <EnrollContactsFormView {...this.props} />;
	}
}

const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);
	const { data } = enrollContactsFormSelector(state);

	return { ...data, dictionaries };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = (dispatch, ownProps) => {
	return {
		updateRegDocument,
		toggleLiveAddressStatus,
		toggleNeedDormitoryStatus,
		updateContactsForm,
		selectMobileGovernment,
		submit: () => {
			dispatch<any>(createVerificationCode()).then(ownProps.submit);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ContactsFormContainer);
