import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	enrollAccountVerificationFormSelector,
	IRootState,
	submitEnrollVerificationForm,
	fromTransaction,
} from '$store';
import {
	EnrollVerificationFormSchema,
	IAccountVerificationForm,
	IApplication,
	IDocument,
	IServerError,
	ITransaction,
} from '$common';
import { sendVerificationCodeToEmail, sendVerificationCodeToPhone } from '$operations';
import { PriemForm, TextInput, Button } from '$components';
import classes from './styles.module.css';
import { ICreateVerificationCodeResponse } from '../../store/transactions/createVerificationCode';

interface IMapStateToProps {
	data: IAccountVerificationForm;
	verificationCode: ITransaction<ICreateVerificationCodeResponse>;
	error: IServerError | null;
	loading: boolean;
}

interface IDispatchToProps {
	onSubmit: (values: IAccountVerificationForm) => void;
	sendCodeToEmail: () => void;
	sendCodeToPhone: () => void;
}
interface IOwnProps {
	onComplete: () => void;
}
type IProps = IMapStateToProps & IDispatchToProps & IOwnProps;
class AccountVerificationContainer extends React.Component<IProps> {
	renderForm = (form: any) => {
		const isVisibleButtons = this.props.verificationCode.result.length === 0;

		return (
			<>
				{isVisibleButtons && (
					<div className={classes.wrapper}>
						<Button onClick={this.props.sendCodeToEmail}>Отправить код на электронную почту</Button>

						<Button onClick={this.props.sendCodeToPhone}>Отправить код на мобильный телефон</Button>
					</div>
				)}
				{!isVisibleButtons && <TextInput name="verificationCode" required label="Код подтверждения" />}
			</>
		);
	};
	onSubmit = (values: IAccountVerificationForm) => {
		this.props.onSubmit(values);
	};
	render() {
		return (
			<PriemForm
				{...this.props}
				onSubmit={this.onSubmit}
				loadingText={this.props.verificationCode.loading ? 'Отправка кода' : 'Формирование личного дела'}
				renderForm={this.renderForm}
				schema={EnrollVerificationFormSchema}
				buttonText={this.props.verificationCode.result.length > 0 ? 'Подтвердить' : ''}
				initialValues={this.props.data}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IMapStateToProps, {}, IRootState> = state => {
	const data = enrollAccountVerificationFormSelector(state);
	const createPerson = fromTransaction.createPerson(state);
	const uploadDocuments = fromTransaction.uploadDocuments(state);
	const createApplications = fromTransaction.createPriemApplications(state);

	const verificationCode = fromTransaction.createVerificationCode(state);

	const documentLoading = Object.values(uploadDocuments).some((document: ITransaction<IDocument>) => document.loading);
	const applicationLoading = Object.values(createApplications).some(
		(application: ITransaction<IApplication>) => application.loading,
	);
	const documentError =
		Object.values(uploadDocuments).find((document: ITransaction<IDocument>) => !!document.error) || null;

	const applicationError =
		Object.values(createApplications).find((application: ITransaction<IApplication>) => !!application.error) || null;

	return {
		data,
		loading: createPerson.loading || documentLoading || verificationCode.loading || applicationLoading,
		error:
			verificationCode.error ||
			createPerson.error ||
			(documentError && documentError.error) ||
			(applicationError && applicationError.error),
		verificationCode,
	};
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = (dispatch, ownProps) => {
	return {
		sendCodeToEmail: () => {
			dispatch<any>(sendVerificationCodeToEmail());
		},
		sendCodeToPhone: () => {
			dispatch<any>(sendVerificationCodeToPhone());
		},
		onSubmit: (values: IAccountVerificationForm) => {
			dispatch(submitEnrollVerificationForm(values));
			ownProps.onComplete();
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AccountVerificationContainer);
