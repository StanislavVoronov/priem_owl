import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	createAppsTransactionSelector,
	createPersonTransactionSelector,
	IRootState,
	submitVerAccountForm,
	updateAddressTransactionSelector,
	uploadDocumentsTransactionSelector,
	verAccountFormSelector,
} from '$store';
import { AddressType, IVerAccountForm } from '$common';
import VerAccountFormView from './VerAccountFormView';
import { Form, IFormField, IFormProps } from '@black_bird/components';
import { IException, prop, TransactionStatus } from '@black_bird/utils';
import classes from './styles.module.css';

interface IMapStateToProps {
	form: IVerAccountForm;
	error?: IException | null;
	loading: boolean;
	folderCreated: boolean;
}

interface IDispatchToProps {
	onSubmit: (values: IFormField) => void;
}

type IProps = IMapStateToProps & IDispatchToProps;
class AccountVerificationContainer extends React.Component<IProps> {
	renderForm = (form: IFormProps<any>) => {
		return <VerAccountFormView value={prop('verAccountCode')(form.values)} onChange={form.onChange} />;
	};

	render() {
		const { loading, onSubmit, error, form, folderCreated } = this.props;

		if (folderCreated) {
			return <div className={classes.folder}>Документы на поступление успешно отправлены</div>;
		}

		return (
			<Form
				onSubmit={onSubmit}
				loading={loading}
				loadingText="Формирование личного дела"
				buttonText="Отправить документы для поступления"
				renderForm={this.renderForm}
				error={error}
				initialValues={form}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IMapStateToProps, {}, IRootState> = state => {
	const form = verAccountFormSelector(state);
	const createPersonDataTransaction = createPersonTransactionSelector(state);
	const updateLiveAddressTransaction = updateAddressTransactionSelector(state, AddressType.Live);
	const updateRegAddressTransaction = updateAddressTransactionSelector(state, AddressType.Reg);
	const appsTransactions = createAppsTransactionSelector(state);
	const docsTransactions = uploadDocumentsTransactionSelector(state);
	const appException = Object.values(appsTransactions).find(item => item.exception);
	const docException = Object.values(docsTransactions).find(item => item.exception);

	return {
		form,
		loading:
			createPersonDataTransaction.isFetching ||
			(updateLiveAddressTransaction && updateLiveAddressTransaction.isFetching) ||
			(updateRegAddressTransaction && updateRegAddressTransaction.isFetching) ||
			Object.values(appsTransactions).some(item => item.isFetching) ||
			Object.values(docsTransactions).some(item => item.isFetching),
		error:
			createPersonDataTransaction.exception ||
			(updateLiveAddressTransaction && updateLiveAddressTransaction.exception) ||
			(updateRegAddressTransaction && updateRegAddressTransaction.exception) ||
			(appException && appException.exception) ||
			(docException && docException.exception) ||
			null,
		folderCreated:
			createPersonDataTransaction.status === TransactionStatus.COMPLETED &&
			(updateLiveAddressTransaction && updateLiveAddressTransaction.status === TransactionStatus.COMPLETED) &&
			(updateRegAddressTransaction && updateRegAddressTransaction.status === TransactionStatus.COMPLETED) &&
			Object.values(appsTransactions).every(item => item.status === TransactionStatus.COMPLETED) &&
			Object.values(docsTransactions).every(item => item.status === TransactionStatus.COMPLETED),
	};
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	onSubmit: submitVerAccountForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerificationContainer);
