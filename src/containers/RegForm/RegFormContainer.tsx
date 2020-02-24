import * as React from 'react';
import RegFormView from './RegFormView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	IRootState,
	regFormSelector,
	fromTransaction,
	submitRegFormAction,
	middleNamesDictionary,
	firstNamesDictionary,
} from '$store';
import { IRegForm, IServerError, IFistNameDictionary } from '$common';
import { ITransaction } from '@black_bird/utils';
import { Form, IFormProps } from '@black_bird/components';

interface IStateToProps {
	firstNameDictionary: ITransaction<IFistNameDictionary>;
	middleNameDictionary: ITransaction<IFistNameDictionary>;
	error: IServerError | null;
	loading: boolean;
	data: IRegForm;
	requestFetching: boolean;
}
interface IDispatchToProps {
	onSubmit: (values: IRegForm) => void;
}

type Props = IStateToProps & IDispatchToProps;
class EnrollRegistrationContainer extends React.Component<Props> {
	onSubmit = (values: IRegForm) => {
		console.log('submit', values);
		this.props.onSubmit(values);
	};

	renderForm = (form: IFormProps<IRegForm>) => {
		return (
			<RegFormView
				form={form}
				firstNameDictionary={this.props.firstNameDictionary}
				middleNameDictionary={this.props.middleNameDictionary}
			/>
		);
	};

	render() {
		const { onSubmit, data, error, requestFetching } = this.props;

		return (
			<Form
				error={error}
				loading={requestFetching}
				loadingText="Проверка личного дела"
				renderForm={this.renderForm}
				onSubmit={onSubmit}
				initialValues={data}
				buttonText="Проверить"
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const firstNameDictionary = firstNamesDictionary(state);
	const middleNameDictionary = middleNamesDictionary(state);

	const isUniqueLoginTransaction = fromTransaction.isUniqueLogin(state);
	const isCreateLoginTransaction = fromTransaction.createLogin(state);
	const data = regFormSelector(state);
	const { error, loading } = fromTransaction.findPerson(state);

	return {
		firstNameDictionary,
		middleNameDictionary,
		data,
		error,
		loading,
		requestFetching:
			isUniqueLoginTransaction.loading ||
			isCreateLoginTransaction.loading ||
			loading,
	};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	onSubmit: submitRegFormAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrollRegistrationContainer);
