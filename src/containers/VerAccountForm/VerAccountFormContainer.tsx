import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	contactsFormSelector,
	createAppsTransactionSelector,
	createPersonTransactionSelector,
	createVerCodeTransactionActions,
	createVerCodeTransactionSelector,
	IRootState,
	submitVerAccountForm,
	updateAddressTransactionSelector,
	uploadDocumentsTransactionSelector,
	verAccountFormSelector,
	verPersonContactsTrnSelector,
} from '$store';
import { AddressType, IVerAccountForm } from '$common';
import VerAccountFormView from './VerAccountFormView';
import { Form, IFormField, IFormProps } from '@black_bird/components';
import {
	IException,
	isEmpty,
	isNotVoid,
	ITransaction,
	prop,
	TransactionStatus,
} from '@black_bird/utils';
import classes from './styles.module.css';

interface IMapStateToProps {
	form: IVerAccountForm;
	createCodeTransaction: ITransaction<unknown>;
	error?: IException | null;
	loading: boolean;
	folderCreated: boolean;
	email: string;
	personExists?: string;
}

interface IDispatchToProps {
	onSubmit: (values: IFormField) => void;
}

type IProps = IMapStateToProps & IDispatchToProps;
class AccountVerificationContainer extends React.Component<IProps> {
	renderForm = (form: IFormProps<any>) => {
		if (this.props.personExists) {
			return null;
		}

		return (
			<VerAccountFormView
				email={this.props.email}
				value={prop('verAccountCode')(form.values)}
				onChange={form.onChange}
			/>
		);
	};
	disabledForm = ({ values }: { values: IVerAccountForm }) => {
		return isEmpty(values.verAccountCode);
	};
	render() {
		const { loading, onSubmit, createCodeTransaction, error, form, folderCreated } = this.props;

		if (folderCreated) {
			return <div className={classes.folder}>Документы на поступление успешно отправлены</div>;
		}

		return (
			<Form
				onSubmit={onSubmit}
				loading={loading}
				disabled={this.disabledForm}
				loadingText={
					createCodeTransaction.isFetching
						? 'Отправка кода подтверждения учетной записи'
						: 'Формирование личного дела'
				}
				buttonText="Отправить документы для поступления"
				renderForm={this.renderForm}
				error={error}
				initialValues={form}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IMapStateToProps, {}, IRootState> = (state) => {
	const form = verAccountFormSelector(state);
	const createPersonDataTransaction = createPersonTransactionSelector(state);
	const updateLiveAddressTransaction = updateAddressTransactionSelector(state, AddressType.Live);
	const updateRegAddressTransaction = updateAddressTransactionSelector(state, AddressType.Reg);
	const appsTransactions = createAppsTransactionSelector(state);
	const docsTransactions = uploadDocumentsTransactionSelector(state);
	const appException = Object.values(appsTransactions).find((item) => item.exception);
	const docException = Object.values(docsTransactions).find((item) => item.exception);
	const createCodeTransaction = createVerCodeTransactionSelector(state);
	const { email } = contactsFormSelector(state);
	const verPersonContacts = verPersonContactsTrnSelector(state);

	return {
		personExists: verPersonContacts.result?.email,
		form,
		loading:
			createPersonDataTransaction.isFetching ||
			(updateLiveAddressTransaction && updateLiveAddressTransaction.isFetching) ||
			(updateRegAddressTransaction && updateRegAddressTransaction.isFetching) ||
			Object.values(appsTransactions).some((item) => item.isFetching) ||
			Object.values(docsTransactions).some((item) => item.isFetching),
		createCodeTransaction,
		email,
		error:
			createPersonDataTransaction.exception ||
			createCodeTransaction.exception ||
			(updateLiveAddressTransaction && updateLiveAddressTransaction.exception) ||
			(updateRegAddressTransaction && updateRegAddressTransaction.exception) ||
			(appException && appException.exception) ||
			(docException && docException.exception) ||
			null,
		folderCreated:
			((createPersonDataTransaction.status === TransactionStatus.COMPLETED &&
				updateLiveAddressTransaction &&
				updateLiveAddressTransaction.status === TransactionStatus.COMPLETED &&
				updateRegAddressTransaction &&
				updateRegAddressTransaction.status === TransactionStatus.COMPLETED) ||
				verPersonContacts.status === TransactionStatus.COMPLETED) &&
			Object.values(appsTransactions).every(
				(item) => item.status === TransactionStatus.COMPLETED,
			) &&
			Object.values(docsTransactions).every((item) => item.status === TransactionStatus.COMPLETED),
	};
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	onSubmit: submitVerAccountForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerificationContainer);
