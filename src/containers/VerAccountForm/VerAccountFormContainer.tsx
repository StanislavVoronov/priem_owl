import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	verAccountFormSelector,
	IRootState,
	submitVerAccountForm,
	createPersonTransactionSelector,
	updateAddressTransactionSelector,
} from '$store';
import { IVerAccountForm, IServerError, ITransaction, AddressType } from '$common';
import VerAccountFormView from './VerAccountFormView';
import { Form, IFormField, IFormProps } from '@black_bird/components';
import { prop } from '@black_bird/utils';

interface IMapStateToProps {
	form: IVerAccountForm;
	error: IServerError | null;
	loading: boolean;
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
		const { loading, onSubmit, error, form } = this.props;

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

	return {
		form,
		loading:
			createPersonDataTransaction.isFetching ||
			(updateLiveAddressTransaction && updateLiveAddressTransaction.isFetching) ||
			(updateRegAddressTransaction && updateRegAddressTransaction.isFetching),
		error:
			createPersonDataTransaction.exception ||
			updateLiveAddressTransaction.exception ||
			updateRegAddressTransaction.exception,
	};
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	onSubmit: submitVerAccountForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerificationContainer);
