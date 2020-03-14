import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { verAccountFormSelector, IRootState, submitVerAccountForm, createPersonTransactionSelector } from '$store';
import {
	IVerAccountForm,
	IServerError,
	ITransaction,
} from '$common';
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
		const { loading, onSubmit, error, form} = this.props;

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
	const createPersonDataITransaction = createPersonTransactionSelector(state);


	return {
		form,
		loading: createPersonDataITransaction.isFetching,
		error: createPersonDataITransaction.exception,
	};
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	onSubmit: submitVerAccountForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerificationContainer);
