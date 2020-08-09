import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	contactsFormSelector,
	createAppsTransactionSelector,
	createPersonTransactionSelector,
	createVerCodeTransactionSelector,
	IRootState,
	submitVerAccountForm,
	updateAddressTransactionSelector,
	uploadDocumentsTransactionSelector,
	verAccountFormSelector,
	verAccountMethodChanged,
	verPersonContactsTrnSelector,
} from '$store';
import { AddressType, IClassifier, IVerAccountForm, VerificationMethod } from '$common';
import VerAccountFormView from './VerAccountFormView';
import { Form, IFormField, IFormProps } from '@black_bird/components';
import { IException, isEmpty, ITransaction, TransactionStatus } from '@black_bird/utils';
import classes from './styles.module.css';

interface IMapStateToProps {
	form: IVerAccountForm;
	createCodeTransaction: ITransaction<unknown>;
	verMethodTrn: ITransaction<any>;
	error?: IException | null;
	loading: boolean;
	folderCreated: boolean;
	email: string;
	personExists?: string;
	mobPhone: string;
	verMethod: IClassifier<VerificationMethod>;
}

interface IDispatchToProps {
	onSubmit: (values: IFormField) => void;
	onChangeVerMethod: (value: IFormField<IClassifier<VerificationMethod>>) => void;
}

type IProps = IMapStateToProps & IDispatchToProps;
class AccountVerificationContainer extends React.Component<IProps> {
	renderForm = (form: IFormProps<any>) => {
		if (this.props.personExists) {
			return null;
		}
		const { email, mobPhone, onChangeVerMethod, verMethod, verMethodTrn } = this.props;

		return (
			<VerAccountFormView
				mobPhone={mobPhone}
				email={email}
				verMethod={verMethod}
				values={form.values}
				onChange={form.onChange}
				onChangeVerMethod={onChangeVerMethod}
				verMethodTrn={verMethodTrn}
			/>
		);
	};
	disabledForm = ({ values }: { values: IVerAccountForm }) => {
		return isEmpty(values.verAccountCode);
	};
	render() {
		const {
			loading,
			onSubmit,
			createCodeTransaction,
			verMethodTrn,
			error,
			form,
			folderCreated,
		} = this.props;

		if (folderCreated) {
			return (
				<p className={classes.notification}>
					<div className={classes.folder}>Документы на поступление успешно отправлены</div>
					<div className={classes.cabinet}>
						Процесс поступления в Университет можно контролировать с помощью{' '}
						<a href="https://monitoring.mgutm.ru/dev/priem/nest/">личного кабинете абитуриента</a>
					</div>
				</p>
			);
		}

		return (
			<Form
				onSubmit={onSubmit}
				loading={loading}
				disabled={this.disabledForm}
				loadingText={
					verMethodTrn.isFetching
						? 'Формирования кода подтверждения'
						: createCodeTransaction.isFetching
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
	const { email, mobPhone } = contactsFormSelector(state);
	const verPersonContacts = verPersonContactsTrnSelector(state);
	const verMethodTrn = createVerCodeTransactionSelector(state);

	return {
		personExists: verPersonContacts.result?.email,
		verMethod: form.verAccountMethod,
		form,
		loading:
			createPersonDataTransaction.isFetching ||
			(updateLiveAddressTransaction && updateLiveAddressTransaction.isFetching) ||
			(updateRegAddressTransaction && updateRegAddressTransaction.isFetching) ||
			Object.values(appsTransactions).some((item) => item.isFetching) ||
			Object.values(docsTransactions).some((item) => item.isFetching),
		createCodeTransaction,
		verMethodTrn,
		email,
		mobPhone,
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
	onChangeVerMethod: verAccountMethodChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerificationContainer);
