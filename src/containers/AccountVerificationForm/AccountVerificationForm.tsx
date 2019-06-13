import * as React from 'react';
import { ChangeEvent } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	enrollAccountVerificationFormSelector,
	IRootState,
	submitEnrollVerificationForm,
	fromTransaction,
} from '$store';
import { EnrollVerificationFormSchema, IAccountVerificationForm, IDocument, IServerError, ITransaction } from '$common';
import { updatePersonInformation } from '$operations';
import { PriemForm, TextInput } from '$components';

interface IMapStateToProps {
	data: IAccountVerificationForm;
	error: IServerError | null;
	loading: boolean;
}

interface IDispatchToProps {
	onSubmit: (values: IAccountVerificationForm) => void;
}
interface IOwnProps {
	onComplete: () => void;
}
type IProps = IMapStateToProps & IDispatchToProps & IOwnProps;
class AccountVerificationContainer extends React.Component<IProps> {
	renderForm = (form: any) => {
		return (
			<TextInput
				name="verificationCode"
				required
				label="Код подтверждения"
				helperText={'Код подтверждения, отправленный на электронную почту'}
			/>
		);
	};
	render() {
		return (
			<PriemForm
				{...this.props}
				loadingText="Формирование личного дела"
				renderForm={this.renderForm}
				schema={EnrollVerificationFormSchema}
				buttonText="Подтвердить"
				initialValues={this.props.data}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IMapStateToProps, {}, IRootState> = state => {
	const data = enrollAccountVerificationFormSelector(state);
	const createPerson = fromTransaction.createPersonSelector(state);
	const uploadDocuments = fromTransaction.uploadDocumentsSelector(state);

	const documentLoading = Object.values(uploadDocuments).some((document: ITransaction<IDocument>) => document.loading);
	const documentError =
		Object.values(uploadDocuments).find((document: ITransaction<IDocument>) => !!document.error) || null;

	return {
		data,
		loading: createPerson.loading || documentLoading,
		error: createPerson.error || (documentError && documentError.error),
	};
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = (dispatch, ownProps) => {
	return {
		onSubmit: (values: IAccountVerificationForm) => {
			dispatch(submitEnrollVerificationForm(values));
			dispatch<any>(updatePersonInformation())
				.then(ownProps.onComplete)
				.catch((error: any) => console.log('errorAccountVerification', error));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AccountVerificationContainer);
