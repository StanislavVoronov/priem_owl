import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IException, ITransaction } from '@black_bird/utils';
import { Form, IFormProps } from '@black_bird/components';
import RegFormView from './RegFormView';
import {
	IRootState,
	regFormSelector,
	submitRegFormAction,
	getMiddleNamesDictionary,
	getFirstNamesDictionary,
	isUniqueLoginTransactionSelector,
	isPersonFoundTransactionSelector,
	createLoginTransactionSelector,
} from '$store';
import { IRegForm, INamesDictionary } from '$common';

interface IStateToProps {
	firstNameDictionary: ITransaction<INamesDictionary[]>;
	middleNameDictionary: ITransaction<INamesDictionary[]>;
	error: IException | null;
	disabledForm: boolean;
	loading: boolean;
	data: IRegForm;
}
interface IDispatchToProps {
	onSubmit: (values: IRegForm) => void;
}

type Props = IStateToProps & IDispatchToProps;
class EnrollRegistrationContainer extends React.Component<Props> {
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
		const { onSubmit, data, error, loading, disabledForm } = this.props;

		return (
			<Form
				error={error}
				loading={loading}
				loadingText="Поиск абитуриента"
				renderForm={this.renderForm}
				disabled={disabledForm}
				onSubmit={onSubmit}
				initialValues={data}
				buttonText="Проверить личное дело"
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = (state) => {
	const firstNameDictionary = getFirstNamesDictionary(state);
	const middleNameDictionary = getMiddleNamesDictionary(state);

	const uniqueLoginTransaction = isUniqueLoginTransactionSelector(state);
	const createLoginTransaction = createLoginTransactionSelector(state);
	const data = regFormSelector(state);
	const findPersonTransaction = isPersonFoundTransactionSelector(state);

	return {
		firstNameDictionary,
		middleNameDictionary,
		data,
		disabledForm: createLoginTransaction.result > 0,
		error: uniqueLoginTransaction.exception || createLoginTransaction.exception || findPersonTransaction.exception,
		loading: uniqueLoginTransaction.isFetching || createLoginTransaction.isFetching || findPersonTransaction.isFetching,
	};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	onSubmit: submitRegFormAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrollRegistrationContainer);
