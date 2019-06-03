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
	fromTransaction,
} from '$store';
import { IDocument, IEnrollContactsForm, ISelectItem, IServerError } from '$common';
import { DictionaryState } from '@mgutm-fcu/dictionary';

interface IStateToProps extends IEnrollContactsForm {
	dictionaries: DictionaryState;
	loading: boolean;
	error: IServerError | null;
}
interface IDispatchToProps {
	updateContactsForm: (event: ChangeEvent<HTMLInputElement>) => void;
	updateRegDocument: (document: IDocument) => void;
	toggleNeedDormitoryStatus: () => void;
	toggleLiveAddressStatus: () => void;
	selectMobileGovernment: (item: ISelectItem) => void;
	createVerificationCode: () => void;
}
interface IOwnProps {
	submit: () => void;
}
type IProps = IDispatchToProps & IStateToProps & IOwnProps;

class ContactsFormContainer extends React.Component<IProps> {
	submit = () => {
		this.props.createVerificationCode();
	};
	render() {
		return <EnrollContactsFormView {...this.props} submit={this.submit} />;
	}
}

const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);
	const { loading, error } = fromTransaction.createVerificationCodeSelector(state);

	const { data } = enrollContactsFormSelector(state);

	return { ...data, dictionaries, loading, error };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = (dispatch, ownProps) => ({
	updateRegDocument: document => dispatch(updateRegDocument(document)),
	toggleLiveAddressStatus: () => dispatch(toggleLiveAddressStatus()),
	toggleNeedDormitoryStatus: () => dispatch(toggleNeedDormitoryStatus()),
	updateContactsForm: event => dispatch(updateContactsForm(event)),
	selectMobileGovernment: government => dispatch(selectMobileGovernment(government)),
	createVerificationCode: () => dispatch<any>(createVerificationCode()).then(ownProps.submit),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ContactsFormContainer);
